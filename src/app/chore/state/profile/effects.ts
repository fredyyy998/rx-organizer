import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../services/profile/profile.service';
import { loadProfile, loadProfileSuccess } from './actions';
import { map, switchMap } from 'rxjs';

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

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
