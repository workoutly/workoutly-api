import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

export class WorkoutRepository implements WorkoutRepositoryInterface {
  public async saveWorkout(workout: Workout) {
    const uri = process.env.DB_URI;

    const client = new MongoClient(uri);

    await client.connect();

    const allMusclesNames = Array<string>();

    workout.muscles.forEach((muslce) => {
      allMusclesNames.push(muslce.name);
    });

    await client.db('workoutly').collection('workout').insertOne({
      id: workout.id,
      name: workout.name,
      description: workout.description,
      muscles: allMusclesNames,
    });

    await client.close();
  }
}
