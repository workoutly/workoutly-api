import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWorkoutCommand } from '../commands/create-workout.command';

import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutRepository } from '../../infrastructure/persistance/workout.repository';
import { Inject } from '@nestjs/common';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { WorkoutId } from '../../domain/entity/workout/workout-id';
import { WorkoutName } from '../../domain/entity/workout/workout-name';
import { WorkoutDescription } from '../../domain/entity/workout/workout-description';
import { Muscle } from '../../domain/entity/muscle/muscle';
import { WorkoutSetting } from '../../domain/entity/workout/workout-setting';

@CommandHandler(CreateWorkoutCommand)
export class CreateWorkoutHandler
  implements ICommandHandler<CreateWorkoutCommand>
{
  constructor(
    @Inject(WorkoutRepository)
    private workoutRepository: WorkoutRepositoryInterface,
  ) {}

  async execute(createWorkoutCommand: CreateWorkoutCommand): Promise<void> {
    try {
      const workoutId = new WorkoutId(createWorkoutCommand._id);
      const workoutName = new WorkoutName(createWorkoutCommand._name);
      const workoutDescription = new WorkoutDescription(
        createWorkoutCommand._description,
      );

      const workout = Workout.create(
        workoutId,
        workoutName,
        workoutDescription,
      );

      createWorkoutCommand._muscles.forEach((muscleDTO) => {
        const muscle = new Muscle(muscleDTO.name);
        workout.addMuscle(muscle);
      });

      createWorkoutCommand._settings.forEach((workoutSettingDTO) => {
        const workoutSetting = new WorkoutSetting(
          workoutSettingDTO.name,
          workoutSettingDTO.value,
        );
        workout.addSetting(workoutSetting);
      });

      await this.workoutRepository.saveWorkout(workout);
    } catch (error) {
      return error.message;
    }
  }
}
