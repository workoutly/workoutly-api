export type muscleDTO = { name: string };

export class Muscle {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }
}