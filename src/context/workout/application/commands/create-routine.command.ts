import { ICommand } from '@nestjs/cqrs';
import { WorkoutDTO } from '@workoutly/contracts';

export class CreateRoutineCommand implements ICommand {
  public readonly _id: string;
  public readonly _name: string;
  public readonly _workouts: WorkoutDTO[];

  constructor(id: string, name: string, worokuts: WorkoutDTO[]) {
    this._id = id;
    this._name = name;
    this._workouts = worokuts;
  }
}
