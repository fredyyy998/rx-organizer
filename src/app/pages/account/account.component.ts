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

  session = this.authService.session;

  updateProfileForm = this.formBuilder.group({
    username: '',
    avatar_url: '',
  });

  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.session) return;

    this.store.dispatch(
      loadProfile({
        user: this.session?.user,
      })
    );

    this.profile$.subscribe(profile => {
      if (!profile) return;

      const { username, avatar_url } = profile;
      this.updateProfileForm.patchValue({
        username,
        avatar_url,
      });
    });
  }

  async updateProfile(): Promise<void> {
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

  async signOut() {
    await this.authService.signOut();
  }
}
