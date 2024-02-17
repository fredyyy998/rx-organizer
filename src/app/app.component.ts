import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { AccountComponent } from './pages/account/account.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { SessionSlice } from './chore/state/session/reducers';
import { selectCurrentSession } from './chore/state/session/selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthComponent,
    AccountComponent,
    NgIf,
    MatToolbar,
    MatIcon,
    MatIconButton,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject<Store<SessionSlice>>(Store);

  session$ = this.store.select(selectCurrentSession);

  constructor() {}
}
