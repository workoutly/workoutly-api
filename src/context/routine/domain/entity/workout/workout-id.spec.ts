import { WorkoutId } from './workout-id';

describe('Workout Id entity', () => {
  it('shoud throw error when not using the right format', async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const wrongFormatWorkoutId = new WorkoutId('wrongFormatId');
    } catch (error) {
      expect(error.message).toBe('invalid id: wrongFormatId');
    }
  });
});
