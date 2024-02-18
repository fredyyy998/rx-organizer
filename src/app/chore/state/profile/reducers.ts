import { UserProfile } from '../../../models/UserProfile';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadProfileSuccess,
  updateProfile,
  updateProfileError,
  updateProfileSuccess,
} from './actions';

export const PROFILE_FEATURE_KEY = 'profile';

export interface ProfileSlice {
  [PROFILE_FEATURE_KEY]: ProfileState;
}

export interface ProfileState {
  profile: UserProfile | null;
  updateRequestInProgress: boolean;
  errorMessage: string | null;
}

export const initialState: ProfileState = {
  profile: null,
  updateRequestInProgress: false,
  errorMessage: null,
};

export const profileFeature = createFeature({
  name: PROFILE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadProfileSuccess, (state, action) => {
      return { ...state, profile: action.profile };
    }),
    on(updateProfile, state => {
      return { ...state, updateRequestInProgress: true };
    }),
    on(updateProfileSuccess, (state, action) => {
      return {
        ...state,
        updateRequestInProgress: false,
        profile: action.profile,
      };
    }),
    on(updateProfileError, (state, action) => {
      return {
        ...state,
        updateRequestInProgress: false,
        errorMessage: action.error,
      };
    })
  ),
});
