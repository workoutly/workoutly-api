import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRoutineHandler } from './application/handler/createRoutine.handler';
import { CreateWorkoutHandler } from './application/handler/createWorkout.handler';
import { GetAllMusclesHandler } from './application/handler/getAllMuscles.handler';
import { GetAllRoutinesHandler } from './application/handler/getAllRoutines.handler';
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
    GetAllRoutinesHandler,
  ],
})
export class WorkoutModule {}
