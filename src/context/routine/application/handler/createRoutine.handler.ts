import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Workout } from '../../domain/entity/workout/workout';
import { Inject } from '@nestjs/common';
import { WorkoutId } from '../../domain/entity/workout/workout-id';
import { WorkoutName } from '../../domain/entity/workout/workout-name';
import { WorkoutDescription } from '../../domain/entity/workout/workout-description';
import { Muscle } from '../../domain/entity/muscle/muscle';
import { WorkoutSetting } from '../../domain/entity/workout/workout-setting';
import { CreateRoutineCommand } from '../commands/create-routine.command';
import { RoutineId } from '../../domain/entity/routine/routine-id';
import { Routine } from '../../domain/entity/routine/routine';
import { RoutineRepositoryInterface } from '../../domain/repository/routineRepository.interface';
import { RoutineRepository } from '../../infrastructure/persistance/routine.repository';

@CommandHandler(CreateRoutineCommand)
export class CreateRoutineHandler
  implements ICommandHandler<CreateRoutineCommand>
{
  constructor(
    @Inject(RoutineRepository)
    private routineRepository: RoutineRepositoryInterface,
  ) {}

  async execute(createRoutineCommand: CreateRoutineCommand): Promise<void> {
    try {
      const routineId = new RoutineId(createRoutineCommand._id);
      const routineName = createRoutineCommand._name;

      const routine = Routine.create(routineId, routineName);

      createRoutineCommand._workouts.forEach((workoutDTO) => {
        const workoutId = new WorkoutId(workoutDTO.id);
        const workoutName = new WorkoutName(workoutDTO.name);
        const workoutDescription = new WorkoutDescription(
          workoutDTO.description,
        );

        const workout = Workout.create(
          workoutId,
          workoutName,
          workoutDescription,
        );

        workoutDTO.muscles.forEach((muscleDTO) => {
          const muscle = new Muscle(muscleDTO.name);
          workout.addMuscle(muscle);
        });

        workoutDTO.settings.forEach((workoutSettingDTO) => {
          const workoutSetting = new WorkoutSetting(
            workoutSettingDTO.name,
            workoutSettingDTO.value,
          );
          workout.addSetting(workoutSetting);
        });

        routine.addWorkout(workout);
      });

      await this.routineRepository.saveRoutine(routine);
    } catch (error) {
      return error.message;
    }
  }
}
