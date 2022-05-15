import { WorkoutDTO } from './createWorkout.DTO';

export class RoutineDTO {
  public id: string;
  public name: string;
  public workouts: WorkoutDTO[];
}
