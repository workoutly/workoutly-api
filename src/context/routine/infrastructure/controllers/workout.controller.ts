import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';
import { WorkoutDTO } from '@workoutly/contracts/workout/createWorkout.DTO';
import { GetAllWorkoutsQuery } from '../../application/queries/getAllWorkouts.query';

@Controller()
export class WorkoutController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('workout')
  async createWorkout(
    @Body('workout') createWorkoutDTO: WorkoutDTO,
  ): Promise<void> {
    const createWorkoutCommand = new CreateWorkoutCommand(
      createWorkoutDTO.id,
      createWorkoutDTO.name,
      createWorkoutDTO.description,
      createWorkoutDTO.muscles,
      createWorkoutDTO.settings,
    );

    return await this.commandBus.execute<CreateWorkoutCommand, void>(
      createWorkoutCommand,
    );
  }

  @Get('workouts')
  async getAllWorkouts(): Promise<WorkoutDTO[]> {
    const getAllWorkoutsQuery = new GetAllWorkoutsQuery();

    return await this.queryBus.execute<GetAllWorkoutsQuery, WorkoutDTO[]>(
      getAllWorkoutsQuery,
    );
  }
}
