import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../services/profile/profile.service';
import {
  loadProfile,
  loadProfileSuccess,
  updateProfile,
  updateProfileError,
  updateProfileSuccess,
} from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PostgrestError } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class ProfileEffects {
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      switchMap(a => this.profileService.profile(a.user)),
      map(profile =>
        loadProfileSuccess({
          profile: {
            id: profile.id,
            username: profile.username,
            avatar_url: profile.avatar_url,
          },
        })
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      switchMap(a =>
        this.profileService.updateProfile({
          id: a.id,
          username: a.username,
          avatar_url: a.avatar_url,
        })
      ),
      map(profile =>
        updateProfileSuccess({
          profile,
        })
      ),
      catchError((err: PostgrestError) =>
        of(updateProfileError({ error: err.message }))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
