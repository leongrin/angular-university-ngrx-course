import {Action, createReducer, on} from '@ngrx/store';
import {User} from './model/user.model';
import {AuthActions} from './action-types';


export interface AuthState {
  user: User
}

export const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  })
)
