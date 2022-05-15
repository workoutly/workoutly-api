import { Workout } from './workout';
import { WorkoutDescription } from './workout-description';
import { WorkoutId } from './workout-id';
import { WorkoutName } from './workout-name';

describe('Workout entity', () => {
  it('Workout names constructor should call the real constructor', async () => {
    const id = new WorkoutId('59ef00ac-534d-49d1-8420-fc692e3b13f9');
    const name = new WorkoutName('workout name');
    const description = new WorkoutDescription('workout description');

    const workout = Workout.create(id, name, description);
    expect(workout.id).toBe(id.value);
    expect(workout.id).not.toBe('');
  });
});
