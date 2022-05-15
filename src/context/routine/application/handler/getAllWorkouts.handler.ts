import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllWorkoutsQuery } from '../queries/getAllWorkouts.query';
import { WorkoutDTO } from '@workoutly/contracts';
import { WorkoutRepository } from '../../infrastructure/persistance/workout.repository';
import { Inject } from '@nestjs/common';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';

@QueryHandler(GetAllWorkoutsQuery)
export class GetAllWorkoutsHandler
  implements IQueryHandler<GetAllWorkoutsQuery>
{
  constructor(
    @Inject(WorkoutRepository)
    private workoutRepository: WorkoutRepositoryInterface,
  ) {}

  async execute(): Promise<WorkoutDTO[]> {
    try {
      const allWorkouts = this.workoutRepository.getAllWorkouts();

      return allWorkouts;
    } catch (error) {
      return error.message;
    }
  }
}
