import { inject, Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { SessionSlice } from '../../state/session/reducers';
import { sessionSetUp } from '../../state/session/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private store = inject<Store<SessionSlice>>(Store);
  _session: AuthSession | null = null;

  private _onAuthentication$ = new Subject<{
    event: AuthChangeEvent;
    session: Session | null;
  }>();

  get onAuthentication$(): Observable<{
    event: AuthChangeEvent;
    session: Session | null;
  }> {
    return this._onAuthentication$.asObservable();
  }

  get session() {
    this.supabaseService.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      this._onAuthentication$.next({ event, session });
      if (session) {
        this.store.dispatch(
          sessionSetUp({
            session: session,
          })
        );
      }
    });
  }

  signIn(email: string) {
    return this.supabaseService.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabaseService.supabase.auth.signOut();
  }
}
