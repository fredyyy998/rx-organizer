import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROFILE_FEATURE_KEY, ProfileState } from './reducers';

export const selectProfile =
  createFeatureSelector<ProfileState>(PROFILE_FEATURE_KEY);

export const selectActiveProfile = createSelector(
  selectProfile,
  profile => profile.profile
);
