import { GetAllMusclesHandler } from './getAllMuscles.handler';
import allMuslcesJson from '../../domain/entity/muscle/muscles.json';

describe('WorkoutHandler', () => {
  it('should call WorkoutRepository.saveWorkout', async () => {
    const handler = new GetAllMusclesHandler();

    const returnedValue = await handler.execute();

    expect(returnedValue).toBe(allMuslcesJson.muscles);
  });
});
