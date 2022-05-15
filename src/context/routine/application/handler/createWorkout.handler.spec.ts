import { randomUUID } from 'crypto';
import { CreateWorkoutCommand } from '../commands/create-workout.command';
import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { CreateWorkoutHandler } from './createWorkout.handler';

class WorkoutMockRepository implements WorkoutRepositoryInterface {
  readonly mockSave = jest.fn((workout) => workout._name);
  readonly mockGet = jest.fn();
  async saveWorkout(workout: Workout): Promise<void> {
    return this.mockSave(workout);
  }
  async getAllWorkouts(): Promise<Workout[]> {
    return this.mockGet();
  }
}

describe('WorkoutHandler', () => {
  it('should call WorkoutRepository.saveWorkout', async () => {
    const repository = new WorkoutMockRepository();
    const handler = new CreateWorkoutHandler(repository);

    const randomId = randomUUID().toString();

    const allMuscles = [{ name: 'bicep' }];

    const allWorkoutSettings = [
      { name: 'kms', value: '8' },
      { name: 'sets', value: '3' },
    ];

    const command = new CreateWorkoutCommand(
      randomId,
      'workoutName',
      'workoutDescription',
      allMuscles,
      allWorkoutSettings,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const returnedValue = await handler.execute(command);

    expect(repository.mockSave).toBeCalledTimes(1);
  });
});
