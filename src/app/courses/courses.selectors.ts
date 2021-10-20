import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoursesState} from './reducers/courses.reducer';
import * as fromCoursesReducer from '../courses/reducers/courses.reducer';


export const selectCoursesState = createFeatureSelector<CoursesState>('courses');


export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCoursesReducer.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
