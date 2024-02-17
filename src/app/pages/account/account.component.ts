import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../chore/services/auth/auth.service';
import { ProfileService } from '../../chore/services/profile/profile.service';
import { ProfileSlice } from '../../chore/state/profile/reducers';
import { Store } from '@ngrx/store';
import { selectActiveProfile } from '../../chore/state/profile/selectors';
import { loadProfile } from '../../chore/state/profile/actions';
import { selectCurrentSession } from '../../chore/state/session/selector';
import { signOut } from '../../chore/state/session/actions';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatButton, MatLabel],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private store = inject<Store<ProfileSlice>>(Store);

  loading = false;
  profile$ = this.store.select(selectActiveProfile);

  session$ = this.store.select(selectCurrentSession);
  session: Session | null = null;

  updateProfileForm = this.formBuilder.group({
    username: '',
    avatar_url: '',
  });

  constructor(
    private readonly profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.session$.subscribe(session => {
      this.session = session;
      if (!session) return;

      this.store.dispatch(
        loadProfile({
          user: session?.user,
        })
      );
    });

    this.profile$.subscribe(profile => {
      if (!profile) return;

      const { username, avatar_url } = profile;
      this.updateProfileForm.patchValue({
        username,
        avatar_url,
      });
    });
  }

  async updateProfile() {
    if (!this.session) return;

    try {
      this.loading = true;
      const { user } = this.session;

      const username = this.updateProfileForm.value.username as string;
      const avatar_url = this.updateProfileForm.value.avatar_url as string;

      const { error } = await this.profileService.updateProfile({
        id: user.id,
        username,
        avatar_url: avatar_url,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  signOut() {
    this.store.dispatch(signOut({ result: true }));
  }
}
