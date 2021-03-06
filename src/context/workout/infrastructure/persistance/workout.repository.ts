import { Workout } from '../../domain/entity/workout';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

export class WorkoutRepository implements WorkoutRepositoryInterface {
  public async saveWorkout(workout: Workout) {
    const uri = process.env.DB_URI;

    const client = new MongoClient(uri);

    await client.connect();

    await client
      .db('workoutly')
      .collection('workout')
      .insertOne({ user: workout.name });

    await client.close();
    return workout.name;
  }
}
