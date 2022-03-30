import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWorkoutCommand } from '../commands/create-workout.command';

import { Workout } from '../../domain/entity/workout';
import { WorkoutRepository } from '../../infrastructure/persistance/workout.repository';
import { Inject } from '@nestjs/common';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';

@CommandHandler(CreateWorkoutCommand)
export class CreateWorkoutHandler
  implements ICommandHandler<CreateWorkoutCommand>
{
  constructor(
    @Inject(WorkoutRepository)
    private workoutRepository: WorkoutRepositoryInterface,
  ) {}

  async execute(createWorkoutCommand: CreateWorkoutCommand): Promise<string> {
    const workout = new Workout(createWorkoutCommand._name);

    return await this.workoutRepository.saveWorkout(workout);
  }
}
