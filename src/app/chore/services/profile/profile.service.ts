import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '../../../models/UserProfile';
import { from, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly supabaseService: SupabaseService) {}

  profile(user: User) {
    return from(
      this.supabaseService.supabase
        .from('profiles')
        .select(`id, username, avatar_url`)
        .eq('id', user.id)
        .single()
    ).pipe(
      map(res => {
        if (res.error && res.status !== 406) {
          throwError(res.error);
        }
        return res.data as UserProfile;
      })
    );
  }

  updateProfile(profile: UserProfile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabaseService.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabaseService.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabaseService.supabase.storage
      .from('avatars')
      .upload(filePath, file);
  }
}
