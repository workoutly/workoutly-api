import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateWorkoutHandler } from './application/handler/create-workout.handler';
import { WorkoutController } from './infrastructure/controllers/workout.controller';
import { WorkoutRepository } from './infrastructure/persistance/workout.repository';

@Module({
  imports: [CqrsModule],
  controllers: [WorkoutController],
  providers: [CreateWorkoutHandler, WorkoutRepository],
})
export class WorkoutModule {}
