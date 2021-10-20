import { Injectable } from '@angular/core';
import {act, Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {CoursesActions} from './courses-action-types';
import {CoursesHttpService} from './services/courses-http.service';
import {concatMap, map, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';



@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      switchMap(data => {
        return this.coursesHttpServ.findAllCourses();
      }),
      map(courses => {
        return CoursesActions.allCoursesLoaded({courses});
      })
    )
  });

  saveCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.courseUpdated),
      concatMap(action => this.coursesHttpServ.saveCourse(action.update.id, action.update.changes))
    )
  }, {dispatch: false});


  constructor(private actions$: Actions,
              private coursesHttpServ: CoursesHttpService,
              private store: Store<AppState>) {}

}
