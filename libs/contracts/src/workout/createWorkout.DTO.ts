import { MuscleDTO } from './muscle.DTO';
import { WorkoutSettingDTO } from './workoutSetting.DTO';

export class WorkoutDTO {
  public id: string;
  public name: string;
  public description: string;
  public muscles: MuscleDTO[];
  public settings: WorkoutSettingDTO[];
}
