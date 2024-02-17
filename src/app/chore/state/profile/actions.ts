import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../../../models/UserProfile';
import { User } from '@supabase/supabase-js';

export const loadProfile = createAction(
  '[profile] loadProfile',
  props<{ user: User }>()
);

export const loadProfileSuccess = createAction(
  '[profile] loadProfileSuccess',
  props<{ profile: UserProfile }>()
);

export const updateProfile = createAction(
  '[profile] updateProfile',
  props<{ id: string; username: string; avatar_url: string }>()
);

export const updateProfileSuccess = createAction(
  '[profile] updateProfileSuccess',
  props<{ profile: UserProfile }>()
);

export const updateProfileError = createAction(
  '[profile] updateProfileError',
  props<{ error: string }>()
);
