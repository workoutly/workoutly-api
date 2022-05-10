import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';
import { CreateWorkoutDTO } from '@workoutly/contracts/workout/createWorkout.DTO';

@Controller('workout')
export class WorkoutController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createWorkout(
    @Body('workout') createWorkoutDTO: CreateWorkoutDTO,
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

  //{
  //  "workout": {
  //      "id": "59ef00ac-534d-49d1-8420-fc692e3b13f9",
  //      "name": "ejerciciodejosele",
  //      "description": "aaaaaaa",
  //      "muscles": [
  //          {"name": "bicep"}
  //      ],
  //      "settings": [
  //          {
  //              "name": "km",
  //              "value": "10"
  //          },
  //          {
  //              "name": "reps",
  //              "value": "3"
  //          }
  //      ]
  //  }
}
