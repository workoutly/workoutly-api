import { ICommand } from '@nestjs/cqrs';

export class CreateWorkoutCommand implements ICommand {
  public readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }
}
