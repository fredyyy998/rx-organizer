import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SupabaseService } from './chore/services/supabase/supabase.service';
import { AccountComponent } from './pages/account/account.component';
import { NgIf } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuthService } from './chore/services/auth/auth.service';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  session = this.auth.session;

  constructor(private readonly auth: AuthService) {}

  ngOnInit() {
    this.auth.authChanges((_, session) => (this.session = session));
  }
}
