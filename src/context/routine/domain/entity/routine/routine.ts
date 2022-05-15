import { Workout } from '../workout/workout';
import { RoutineId } from './routine-id';

export class Routine {
  private _id: RoutineId;
  private _name: string;
  private _workouts: Workout[] = [];

  private constructor(id: RoutineId, name: string) {
    this._id = id;
    this._name = name;
  }

  static create(id: RoutineId, name: string) {
    const routine = new Routine(id, name);
    return routine;
  }

  public get id(): string {
    return this._id.value;
  }

  public get name(): string {
    return this._name;
  }

  public addWorkout(workout: Workout): void {
    this._workouts.push(workout);
  }

  public get workouts(): Workout[] {
    return this._workouts;
  }
}
