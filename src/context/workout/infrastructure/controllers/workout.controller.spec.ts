import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateWorkoutCommand } from '../../application/commands/create-workout.command';
import { WorkoutController } from './workout.controller';

describe('WorkoutController', () => {
  let controller: WorkoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [WorkoutController],
      providers: [CreateWorkoutCommand],
    }).compile();

    controller = module.get<WorkoutController>(WorkoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
