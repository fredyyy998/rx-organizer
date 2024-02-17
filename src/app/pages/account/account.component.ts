import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/UserProfile';
import { SupabaseService } from '../../chore/services/supabase/supabase.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../chore/services/auth/auth.service';
import { ProfileService } from '../../chore/services/profile/profile.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatButton, MatLabel],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  loading = false;
  profile!: UserProfile;

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

  async ngOnInit(): Promise<void> {
    await this.getProfile();

    const { username, avatar_url } = this.profile;
    this.updateProfileForm.patchValue({
      username,
      avatar_url,
    });
  }

  async getProfile() {
    if (!this.session) return;

    try {
      this.loading = true;
      const { user } = this.session;
      const {
        data: profile,
        error,
        status,
      } = await this.profileService.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile as UserProfile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
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