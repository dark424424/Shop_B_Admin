import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.store.reducer';

export const selectUserState = createFeatureSelector<UserState>('userStore');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);
