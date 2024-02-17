import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../chore/services/auth/auth.service';
import { ProfileService } from '../../chore/services/profile/profile.service';
import { ProfileSlice } from '../../chore/state/profile/reducers';
import { Store } from '@ngrx/store';
import {
  selectActiveProfile,
  selectProfileError,
  selectProfileUpdateRequestInProgress,
} from '../../chore/state/profile/selectors';
import { loadProfile, updateProfile } from '../../chore/state/profile/actions';
import { selectCurrentSession } from '../../chore/state/session/selector';
import { signOut } from '../../chore/state/session/actions';
import { Session } from '@supabase/supabase-js';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    AsyncPipe,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private store = inject<Store<ProfileSlice>>(Store);

  loading$ = this.store.select(selectProfileUpdateRequestInProgress);
  error$ = this.store.select(selectProfileError);
  profile$ = this.store.select(selectActiveProfile);

  session$ = this.store.select(selectCurrentSession);
  session: Session | null = null;

  updateProfileForm = this.formBuilder.group({
    username: '',
    avatar_url: '',
  });

  constructor(private formBuilder: FormBuilder) {}

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

    this.error$.subscribe(error => {
      if (error) alert(error);
    });
  }

  updateProfile() {
    if (!this.session) return;
    const { user } = this.session;

    const username = this.updateProfileForm.value.username as string;
    const avatar_url = this.updateProfileForm.value.avatar_url as string;

    this.store.dispatch(
      updateProfile({
        id: user.id,
        username,
        avatar_url,
      })
    );
  }

  signOut() {
    this.store.dispatch(signOut());
  }
}
