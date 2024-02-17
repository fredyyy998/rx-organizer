import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SESSION_FEATURE_KEY, SessionState } from './reducers';

export const selectSession =
  createFeatureSelector<SessionState>(SESSION_FEATURE_KEY);

export const selectCurrentSession = createSelector(
  selectSession,
  session => session.session
);
