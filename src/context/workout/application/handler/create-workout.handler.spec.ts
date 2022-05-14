import { randomUUID } from 'crypto';
import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';
import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutDescription } from '../../domain/entity/workout/workout-description';
import { WorkoutId } from '../../domain/entity/workout/workout-id';
import { WorkoutName } from '../../domain/entity/workout/workout-name';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { CreateWorkoutHandler } from './create-workout.handler';

class WorkoutMockRepository implements WorkoutRepositoryInterface {
  readonly mockSave = jest.fn((workout) => workout._name);
  async saveWorkout(workout: Workout): Promise<void> {
    return this.mockSave(workout);
  }
}

describe('WorkoutHandler', () => {
  it('should call WorkoutRepository.saveWorkout', async () => {
    const repository = new WorkoutMockRepository();
    const handler = new CreateWorkoutHandler(repository);

    const randomId = randomUUID().toString();

    const workoutId = new WorkoutId(randomId);
    const workoutName = new WorkoutName('workoutName');
    const workoutDescription = new WorkoutDescription('workoutDescription');
    const workout = Workout.create(workoutId, workoutName, workoutDescription);

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
