import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Profile {
  username: string;
  avatar_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  async getDebts(sheetId: string) {
    let { data: dettes, error } = await this.supabase
      .from('dettes')
      .select()
      .eq('feuillesDettes', sheetId);
    if (dettes && dettes.length > 0) {
      dettes.map((x) => (x.transactionDate = new Date(x.transactionDate)));
    }
    return dettes;
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signIn({ email, password });
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}
