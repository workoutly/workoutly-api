import allMuslcesJson from '../../domain/entity/muscle/muscles.json';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMusclesQuery } from '../queries/getAllMuscles.query';
import { muscleDTO } from '../../domain/entity/muscle/muscle';

type muscle = muscleDTO;

@QueryHandler(GetAllMusclesQuery)
export class GetAllMusclesHandler implements IQueryHandler<GetAllMusclesQuery> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async execute(): Promise<muscle[]> {
    try {
      const allMuscles = allMuslcesJson.muscles;
      return allMuscles;
    } catch (error) {
      return error.message;
    }
  }
}
