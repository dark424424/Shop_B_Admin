import { createReducer, on } from '@ngrx/store';
import { User } from './user.store.model';
import { clearUserInformation, saveUserInformation } from './user.store.action';

export interface UserState {
  user: any;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(saveUserInformation, (state, { payload }) => ({
    ...state,
    user: payload,
  })),
  on(clearUserInformation, (state) => ({
    ...initialState,
  }))
);

export function reducer(state: any, action: any) {
  return userReducer(state, action);
}
