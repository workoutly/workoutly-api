import { randomUUID } from 'crypto';
import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';
import { Workout } from '../../domain/entity/workout';
import { WorkoutDescription } from '../../domain/entity/workout-description';
import { WorkoutId } from '../../domain/entity/workout-id';
import { WorkoutName } from '../../domain/entity/workout-name';
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

    const command = new CreateWorkoutCommand(
      randomId,
      'workoutName',
      'workoutDescription',
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const returnedValue = await handler.execute(command);

    expect(repository.mockSave).toHaveBeenLastCalledWith(workout);
  });

  it('should return workout name', async () => {
    const repository = new WorkoutMockRepository();
    const handler = new CreateWorkoutHandler(repository);

    const randomId = randomUUID().toString();

    const command = new CreateWorkoutCommand(
      randomId,
      'workoutName',
      'workoutDescription',
    );

    const returnedValue = await handler.execute(command);

    expect(returnedValue).toBe(undefined);
  });
});
