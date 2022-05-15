import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllRoutinesQuery } from '../queries/getAllRoutinesQuery';
import { RoutineRepository } from '../../infrastructure/persistance/routine.repository';
import { RoutineRepositoryInterface } from '../../domain/repository/routineRepository.interface';
import { Routine } from '../../domain/entity/routine/routine';

@QueryHandler(GetAllRoutinesQuery)
export class GetAllRoutinesHandler
  implements IQueryHandler<GetAllRoutinesQuery>
{
  constructor(
    @Inject(RoutineRepository)
    private routineRepository: RoutineRepositoryInterface,
  ) {}

  async execute(): Promise<Routine[]> {
    try {
      const allRoutines = this.routineRepository.getAllRoutines();

      return allRoutines;
    } catch (error) {
      return error.message;
    }
  }
}
