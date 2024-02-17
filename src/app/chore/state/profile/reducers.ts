import { UserProfile } from '../../../models/UserProfile';
import { createFeature, createReducer, on } from '@ngrx/store';
import { loadProfileSuccess } from './actions';

export const PROFILE_FEATURE_KEY = 'profile';

export interface ProfileSlice {
  [PROFILE_FEATURE_KEY]: ProfileState;
}

export interface ProfileState {
  profile: UserProfile | null;
}

export const initialState: ProfileState = {
  profile: null,
};

export const profileFeature = createFeature({
  name: PROFILE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadProfileSuccess, (state, action) => {
      return { ...state, profile: action.profile };
    })
  ),
});
