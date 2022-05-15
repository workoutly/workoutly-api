import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoutineDTO } from '@workoutly/contracts/workout/createRoutine.DTO';
import { CreateRoutineCommand } from '../../application/commands/create-routine.command';
import { GetAllRoutinesQuery } from '../../application/queries/getAllRoutinesQuery';

@Controller()
export class RoutineController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('routine')
  async createRoutine(
    @Body('routine') createRoutineDTO: RoutineDTO,
  ): Promise<void> {
    const createRoutineCommand = new CreateRoutineCommand(
      createRoutineDTO.id,
      createRoutineDTO.name,
      createRoutineDTO.workouts,
    );

    return await this.commandBus.execute<CreateRoutineCommand, void>(
      createRoutineCommand,
    );
  }

  @Get('routines')
  async getAllRoutines(): Promise<RoutineDTO[]> {
    const getAllRoutinesQuery = new GetAllRoutinesQuery();

    return await this.queryBus.execute<GetAllRoutinesQuery, RoutineDTO[]>(
      getAllRoutinesQuery,
    );
  }
}
