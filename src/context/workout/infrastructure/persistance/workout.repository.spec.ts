import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutRepository } from './workout.repository';

describe('WorkoutRepository', () => {
  let repository = new WorkoutRepository();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [WorkoutRepository],
    }).compile();

    repository = module.get<WorkoutRepository>(WorkoutRepository);
    await module.init();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should return none when saving a workout', () => {
    expect(repository).toBeDefined();
  });
});
