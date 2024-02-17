import { Routes } from '@angular/router';
import { authGuard } from './chore/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'todo-list',
    loadChildren: () =>
      import('./pages/todo-list/todo-list.module').then(m => m.TodoListModule),
    canActivate: [authGuard],
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account/account.component').then(c => c.AccountComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/auth.component').then(c => c.AuthComponent),
  },
  {
    path: '**',
    redirectTo: 'todo-list',
  },
];
