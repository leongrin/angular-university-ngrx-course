import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {CoursesActions} from './courses-action-types';
import * as CoursesSelectors from '../courses/courses.selectors';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<boolean> {

  loading = false;

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(CoursesSelectors.areCoursesLoaded),
      tap(coursesLoaded => {

        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(CoursesActions.loadAllCourses())
        }

      }),
      filter(coursesLoaded => coursesLoaded),
      first(),   // to complete the observable, because the router will only complete the transition to the target
      // screen when the observable completes
      finalize(() => this.loading = false)  // it runs when the observable completes or when it errors out
    )
  }
}
