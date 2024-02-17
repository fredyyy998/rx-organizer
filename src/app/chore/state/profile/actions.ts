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
