export class WorkoutName {
  private _value: string;

  constructor(name: string) {
    if (name == '') {
      throw Error('empty workout name');
    }
    if (name == undefined) {
      throw Error('empty workout name');
    }

    this._value = name;
  }

  get name(): string {
    return this._value;
  }
}
