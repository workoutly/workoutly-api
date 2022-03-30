import { Workout } from '../entity/workout';

export interface WorkoutRepositoryInterface {
  saveWorkout(workout: Workout): Promise<string>;
}
