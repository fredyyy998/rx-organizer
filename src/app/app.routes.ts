import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account/account.component').then(c => c.AccountComponent),
  },
];
