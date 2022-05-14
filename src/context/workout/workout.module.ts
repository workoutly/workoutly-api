import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateWorkoutHandler } from './application/handler/create-workout.handler';
import { GetAllMusclesHandler } from './application/handler/getAllMuscles.handler';
import { GetAllWorkoutsHandler } from './application/handler/getAllWorkouts.handler';
import { MuscleController } from './infrastructure/controllers/muscle.controller';
import { WorkoutController } from './infrastructure/controllers/workout.controller';
import { WorkoutRepository } from './infrastructure/persistance/workout.repository';

@Module({
  imports: [CqrsModule],
  controllers: [WorkoutController, MuscleController],
  providers: [
    CreateWorkoutHandler,
    WorkoutRepository,
    GetAllMusclesHandler,
    GetAllWorkoutsHandler,
  ],
})
export class WorkoutModule {}
