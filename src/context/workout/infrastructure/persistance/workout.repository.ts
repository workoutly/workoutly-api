import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

export class WorkoutRepository implements WorkoutRepositoryInterface {
  public async saveWorkout(workout: Workout) {
    const uri = process.env.DB_URI;

    const client = new MongoClient(uri);

    await client.connect();

    const allMusclesNames = workout.muscles.map((muscle) => ({
      name: muscle.name,
    }));

    const allWorkoutSettings = workout.settings.map((setting) => ({
      name: setting.name,
      value: setting.value,
    }));

    await client.db('workoutly').collection('workout').insertOne({
      id: workout.id,
      name: workout.name,
      description: workout.description,
      muscles: allMusclesNames,
      settings: allWorkoutSettings,
    });

    await client.close();
  }
}
