import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss'],
})
export class CreateUserPageComponent implements OnInit {
  loading = false;
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  async createUser(login: string, username: string, password: string) {
    this.loading = true;
    const signUp = await this.supabase.signUp(login, password);
    if (signUp.error) {
      alert(signUp.error);
    } else {
      const profile: Profile = {
        username,
      };
      await this.supabase.updateProfile(profile);
      this.router.navigate(['/login']);
    }

    this.loading = false;
  }
}
