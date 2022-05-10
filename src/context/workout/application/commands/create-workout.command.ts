import { ICommand } from '@nestjs/cqrs';
import { MuscleDTO, WorkoutSettingDTO } from '@workoutly/contracts';

export class CreateWorkoutCommand implements ICommand {
  public readonly _id: string;
  public readonly _name: string;
  public readonly _description: string;
  public readonly _muscles: MuscleDTO[];
  public readonly _settings: WorkoutSettingDTO[];

  constructor(
    id: string,
    name: string,
    description: string,
    muscles: MuscleDTO[],
    settings: WorkoutSettingDTO[],
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._muscles = muscles;
    this._settings = settings;
  }
}
