import { Routine } from '../entity/routine/routine';

export interface RoutineRepositoryInterface {
  saveRoutine(routine: Routine): Promise<void>;
  getAllRoutines(): Promise<Routine[]>;
}
