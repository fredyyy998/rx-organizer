import { createAction, props } from '@ngrx/store';
import { Session } from '@supabase/supabase-js';

export const signInWithOtp = createAction(
  '[session] signInWithOtp',
  props<{ email: string }>()
);

export const signInWithOtpSuccess = createAction(
  '[session] signInWithOtpSuccess',
  props<{ result: any }>()
);

export const sessionSetUp = createAction(
  '[session] sessionSetUp',
  props<{ session: Session }>()
);

export const signOut = createAction(
  '[session] signOut',
  props<{ result: any }>()
);

export const signOutSuccess = createAction(
  '[session] signOutSuccess',
  props<{ result: any }>()
);
