import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {compareCourses, Course} from '../model/course';
import {CoursesActions} from '../courses-action-types';


export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const {selectAll} = adapter.getSelectors();


export const coursesReducer = createReducer(
  initialCoursesState,

  on(CoursesActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, {...state, allCoursesLoaded: true});
  }),

  on(CoursesActions.courseUpdated, (state, action) => {
    return adapter.updateOne(action.update, state)
  })


)
