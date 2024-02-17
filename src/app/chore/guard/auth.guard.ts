import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { Store } from '@ngrx/store';
import { SessionSlice } from '../state/session/reducers';
import { selectCurrentSession } from '../state/session/selector';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject<Store<SessionSlice>>(Store);
  const session$ = store.select(selectCurrentSession);

  return session$.pipe(map(session => hasSession(session)));
};

const hasSession = (session: Session | null) => {
  return !!session;
};
