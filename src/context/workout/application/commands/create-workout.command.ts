import { ICommand } from '@nestjs/cqrs';

export class CreateWorkoutCommand implements ICommand {
  public readonly _id: string;
  public readonly _name: string;
  public readonly _description: string;

  constructor(id: string, name: string, description: string) {
    this._id = id;
    this._name = name;
    this._description = description;
  }
}
