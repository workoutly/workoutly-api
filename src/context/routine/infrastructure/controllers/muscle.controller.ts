import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllMusclesQuery } from '../../application/queries/getAllMuscles.query';
import { muscleDTO } from '../../domain/entity/muscle/muscle';

type muscle = muscleDTO;

@Controller('muscles')
export class MuscleController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getAllMuscles(): Promise<muscle[]> {
    const getAllMusclesQuery = new GetAllMusclesQuery();

    return await this.queryBus.execute<GetAllMusclesQuery, muscle[]>(
      getAllMusclesQuery,
    );
  }
}
