import { Workout } from '../entity/workout/workout';

export interface WorkoutRepositoryInterface {
  saveWorkout(workout: Workout): Promise<void>;
}
