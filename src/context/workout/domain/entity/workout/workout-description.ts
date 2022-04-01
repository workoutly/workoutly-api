export class WorkoutDescription {
  private _value: string;

  constructor(description: string) {
    if (description == undefined) {
      this._value = '';
    }
    this._value = description;
  }

  get value(): string {
    return this._value;
  }
}
