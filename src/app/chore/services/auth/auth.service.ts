import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _session: AuthSession | null = null;

  get session() {
    this.supabaseService.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  constructor(private readonly supabaseService: SupabaseService) {}

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabaseService.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabaseService.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabaseService.supabase.auth.signOut();
  }
}
