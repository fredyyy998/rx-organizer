import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Session } from '@supabase/supabase-js';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return hasSession(authService.session);
};

const hasSession = (session: Session | null) => {
  return !!session;
};
