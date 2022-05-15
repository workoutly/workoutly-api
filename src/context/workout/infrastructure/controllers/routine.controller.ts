import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoutineDTO } from '@workoutly/contracts/workout/createRoutine.DTO';
import { CreateRoutineCommand } from '../../application/commands/create-routine.command';

@Controller('routine')
export class RoutineController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async createWorkout(
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

  //@Get()
  //async getAllWorkouts(): Promise<WorkoutDTO[]> {
  //  const getAllWorkoutsQuery = new GetAllWorkoutsQuery();
  //
  //  return await this.queryBus.execute<GetAllWorkoutsQuery, WorkoutDTO[]>(
  //    getAllWorkoutsQuery,
  //  );
  //}
}
