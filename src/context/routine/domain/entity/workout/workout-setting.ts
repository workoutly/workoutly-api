export class WorkoutSetting {
  private _name: string;
  private _value: string;

  constructor(name: string, value: string) {
    this._name = name;
    this._value = value;
  }

  public get name(): string {
    return this._name;
  }

  public get value(): string {
    return this._value;
  }
}
