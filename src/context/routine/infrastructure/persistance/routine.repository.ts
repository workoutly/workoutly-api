import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { RoutineRepositoryInterface } from '../../domain/repository/routineRepository.interface';
import { Routine } from '../../domain/entity/routine/routine';
import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutSetting } from '../../domain/entity/workout/workout-setting';

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

  public async getAllRoutines(): Promise<Routine[]> {
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

    const allRoutines = new Array<Routine>();

    await client
      .db('workoutly')
      .collection('routine')
      .find()
      .forEach((routineDocument) => {
        const r = Routine.create(routineDocument.id, routineDocument.name);

        routineDocument.workouts.map((workout) => {
          const w = Workout.create(
            workout._id,
            workout._name,
            workout._description,
          );

          workout._muscles.map((muscle) => {
            w.addMuscle(muscle);
          });

          workout._settings.map((setting) => {
            const s = new WorkoutSetting(setting._name, setting._value);
            w.addSetting(s);
          });
          r.addWorkout(workout);
        });

        allRoutines.push(r);
      });

    await client.close();

    return allRoutines;
  }
}
