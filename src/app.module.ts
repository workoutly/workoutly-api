import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WorkoutModule } from './context/workout/workout.module';

@Module({
  imports: [CqrsModule, WorkoutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
