import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { RoutineRepositoryInterface } from '../../domain/repository/routineRepository.interface';
import { Routine } from '../../domain/entity/routine/routine';
import { Workout } from '../../domain/entity/workout/workout';
import { WorkoutSetting } from '../../domain/entity/workout/workout-setting';
import { WorkoutId } from '../../domain/entity/workout/workout-id';
import { WorkoutName } from '../../domain/entity/workout/workout-name';
import { WorkoutDescription } from '../../domain/entity/workout/workout-description';

export class RoutineRepository implements RoutineRepositoryInterface {
  public async saveRoutine(routine: Routine) {
    const uri = process.env.DB_URI;

    const client = new MongoClient(uri);

    await client.connect();

    const allWorkouts = [];

    routine.workouts.forEach((workout) => {
      const wId = { id: workout.id };
      const wName = { name: workout.name };
      const wDesc = { description: workout.description };

      const allMusclesNames = workout.muscles.map((muscle) => ({
        name: muscle.name,
      }));

      const allWorkoutSettings = workout.settings.map((setting) => ({
        name: setting.name,
        value: setting.value,
      }));

      const w = {
        id: wId.id,
        name: wName.name,
        description: wDesc.description,
        muscles: allMusclesNames,
        settings: allWorkoutSettings,
      };
      allWorkouts.push(w);
    });

    await client.db('workoutly').collection('routine').insertOne({
      id: routine.id,
      name: routine.name,
      workouts: allWorkouts,
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
            workout.id,
            workout.name,
            workout.description,
          );

          workout.muscles.map((muscle) => {
            w.addMuscle(muscle);
          });

          workout.settings.map((setting) => {
            const s = new WorkoutSetting(setting.name, setting.value);
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
