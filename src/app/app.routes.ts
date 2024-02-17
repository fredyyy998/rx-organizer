import { Routes } from '@angular/router';
import { authGuard } from './chore/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account/account.component').then(c => c.AccountComponent),
    canActivate: [authGuard],
  },
];
