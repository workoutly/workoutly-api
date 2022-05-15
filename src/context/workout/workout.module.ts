import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRoutineHandler } from './application/handler/create-routine.handler';
import { CreateWorkoutHandler } from './application/handler/create-workout.handler';
import { GetAllMusclesHandler } from './application/handler/getAllMuscles.handler';
import { GetAllWorkoutsHandler } from './application/handler/getAllWorkouts.handler';
import { MuscleController } from './infrastructure/controllers/muscle.controller';
import { RoutineController } from './infrastructure/controllers/routine.controller';
import { WorkoutController } from './infrastructure/controllers/workout.controller';
import { RoutineRepository } from './infrastructure/persistance/routine.repository';
import { WorkoutRepository } from './infrastructure/persistance/workout.repository';

@Module({
  imports: [CqrsModule],
  controllers: [WorkoutController, MuscleController, RoutineController],
  providers: [
    CreateWorkoutHandler,
    CreateRoutineHandler,
    WorkoutRepository,
    RoutineRepository,
    GetAllMusclesHandler,
    GetAllWorkoutsHandler,
  ],
})
export class WorkoutModule {}
