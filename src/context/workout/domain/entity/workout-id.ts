import * as uuid from 'uuid';

export class WorkoutId {
  private _value: string;

  constructor(id: string) {
    if (!uuid.validate(id)) {
      throw Error('invalid id: ' + id);
    }

    this._value = id;
  }

  get value(): string {
    return this._value;
  }
}
