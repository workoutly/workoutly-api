import { Muscle } from '../muscle/muscle';
import { WorkoutDescription } from './workout-description';
import { WorkoutId } from './workout-id';
import { WorkoutName } from './workout-name';

export class Workout {
  private _id: WorkoutId;
  private _name: WorkoutName;
  private _description: WorkoutDescription;
  private _muscles: Muscle[] = [];

  private constructor(
    id: WorkoutId,
    name: WorkoutName,
    description: WorkoutDescription,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
  }

  static create(
    id: WorkoutId,
    name: WorkoutName,
    description: WorkoutDescription,
  ) {
    const workout = new Workout(id, name, description);
    return workout;
  }

  public get id(): string {
    return this._id.value;
  }

  public get name(): string {
    return this._name.name;
  }

  public get description(): string {
    return this._description.value;
  }

  public addMuscle(muscle: Muscle): void {
    this._muscles.push(muscle);
  }

  public get muscles(): Muscle[] {
    return this._muscles;
  }
}
