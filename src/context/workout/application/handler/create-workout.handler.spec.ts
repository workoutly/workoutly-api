import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';
import { Workout } from '../../domain/entity/workout';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { CreateWorkoutHandler } from './create-workout.handler';

class WorkoutMockRepository implements WorkoutRepositoryInterface {
  readonly mockSave = jest.fn((workout) => workout._name);
  async saveWorkout(workout: Workout): Promise<string> {
    return this.mockSave(workout);
  }
}

describe('WorkoutController', () => {
  it('should call WorkoutRepository.saveWorkout & return workout name', async () => {
    const repository = new WorkoutMockRepository();
    const handler = new CreateWorkoutHandler(repository);
    const workout = new Workout('test');
    const command = new CreateWorkoutCommand('test');

    const returnValue = await handler.execute(command);

    expect(repository.mockSave).toHaveBeenLastCalledWith(workout);
    expect(returnValue).toBe('test');
  });
});
