import { Controller, Post, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';

@Controller('workout')
export class WorkoutController {
  constructor(private commandBus: CommandBus) {}

  @Post(':workout')
  async createWorkout(@Param('workout') workout: string): Promise<string> {
    const createWorkoutCommand = new CreateWorkoutCommand(workout);

    return await this.commandBus.execute<CreateWorkoutCommand, string>(
      createWorkoutCommand,
    );
  }
}
