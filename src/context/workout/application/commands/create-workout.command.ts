import { ICommand } from '@nestjs/cqrs';

export class CreateWorkoutCommand implements ICommand {
  public readonly _id: string;
  public readonly _name: string;
  public readonly _description: string;
  public readonly _muscles: string[] = [];

  constructor(
    id: string,
    name: string,
    description: string,
    muscles: string[],
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._muscles = muscles;
  }
}
