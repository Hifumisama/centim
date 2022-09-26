import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Profile, SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly _profileSource = new BehaviorSubject<Profile>({
    username: '',
  });
  readonly profile$ = this._profileSource.asObservable();

  constructor(private readonly supabaseService: SupabaseService) {}

  getProfile(): Profile {
    return this._profileSource.getValue();
  }

  setProfile(profile: Profile) {
    this._profileSource.next(profile);
  }

  async fetchProfile() {
    let { data: profile, error } = await this.supabaseService.supabase
      .from('profiles')
      .select(`username, avatar_url`)
      .eq('id', this.supabaseService.user?.id)
      .single();
    this.setProfile(profile as Profile);
  }

  async updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.supabaseService.user?.id,
      updated_at: new Date(),
    };

    await this.supabaseService.supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });

    this.setProfile(profile);
  }
}
