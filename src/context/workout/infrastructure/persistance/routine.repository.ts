import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { RoutineRepositoryInterface } from '../../domain/repository/routineRepository.interface';
import { Routine } from '../../domain/entity/routine/routine';

export class RoutineRepository implements RoutineRepositoryInterface {
  public async saveRoutine(routine: Routine) {
    const uri = process.env.DB_URI;

    const client = new MongoClient(uri);

    await client.connect();

    await client.db('workoutly').collection('routine').insertOne({
      id: routine.id,
      name: routine.name,
      workouts: routine.workouts,
    });

    await client.close();
  }
}
