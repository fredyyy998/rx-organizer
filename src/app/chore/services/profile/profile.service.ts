import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '../../../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly supabaseService: SupabaseService) {}

  profile(user: User) {
    return this.supabaseService.supabase
      .from('profiles')
      .select(`username, avatar_url`)
      .eq('id', user.id)
      .single();
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
