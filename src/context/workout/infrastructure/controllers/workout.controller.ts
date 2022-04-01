import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';

@Controller('workout')
export class WorkoutController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createWorkout(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('muscles') muscles: string[], // receives ["bicep","chest"] when posting '{"muscles":["bicep","chest"]}'
  ): Promise<void> {
    const createWorkoutCommand = new CreateWorkoutCommand(
      id,
      name,
      description,
      muscles,
    );

    return await this.commandBus.execute<CreateWorkoutCommand, void>(
      createWorkoutCommand,
    );
  }
}
