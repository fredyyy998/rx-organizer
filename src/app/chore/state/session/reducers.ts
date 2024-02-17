import { Session } from '@supabase/supabase-js';
import { createFeature, createReducer, on } from '@ngrx/store';
import { sessionSetUp, signOutSuccess } from './actions';

export const SESSION_FEATURE_KEY = 'session';

export interface SessionSlice {
  [SESSION_FEATURE_KEY]: SessionState;
}

export interface SessionState {
  session: Session | null;
}

export const initialState: SessionState = {
  session: null,
};

export const sessionFeature = createFeature({
  name: SESSION_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(signOutSuccess, state => {
      return { ...state, session: null };
    }),
    on(sessionSetUp, (state, action) => {
      return { ...state, session: action.session };
    })
  ),
});
