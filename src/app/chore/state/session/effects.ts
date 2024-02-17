import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import {
  signInWithOtp,
  signInWithOtpSuccess,
  signOut,
  signOutSuccess,
} from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInWithOtp),
      switchMap(({ email }) => this.authService.signIn(email)),
      map(() =>
        signInWithOtpSuccess({
          result: true,
        })
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() => this.authService.signOut()),
      map(() => signOutSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
