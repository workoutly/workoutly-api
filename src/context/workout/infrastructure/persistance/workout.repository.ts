import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutRepositoryInterface } from '../../domain/repository/workoutRepository.interface';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { WorkoutSetting } from '../../domain/entity/workout/workout-setting';

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

  public async getAllWorkouts(): Promise<Workout[]> {
    const uri = process.env.DB_URI;

    const client = new MongoClient(uri);

    await client.connect();

    //interface WorkoutDTO extends WithId<Document> {
    //  id: string;
    //  name: string;
    //  description: string;
    //  muscles: MuscleDTO[];
    //  settings: WorkoutSettingDTO[];
    //}

    const allWorkouts = new Array<Workout>();

    await client
      .db('workoutly')
      .collection('workout')
      .find()
      .forEach((workoutDocument) => {
        const w = Workout.create(
          workoutDocument.id,
          workoutDocument.name,
          workoutDocument.description,
        );

        workoutDocument.muscles.map((muscle) => {
          w.addMuscle(muscle);
        });

        workoutDocument.settings.map((setting) => {
          const s = new WorkoutSetting(setting.name, setting.value);
          w.addSetting(s);
        });

        allWorkouts.push(w);
      });

    await client.close();

    return allWorkouts;
  }
}
