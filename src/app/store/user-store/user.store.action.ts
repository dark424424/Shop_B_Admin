import { createAction, props } from '@ngrx/store';
import { User } from './user.store.model';

export const saveUserInformation = createAction(
  '[User] Save User Information',
  props<{ payload: any }>()
);

export const clearUserInformation = createAction(
  '[User] Clear User Information'
);
