import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  loading = false;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router,
    private readonly profileService: ProfileService
  ) {}

  async handleLogin(login: string, password: string) {
    this.loading = true;
    const signIn = await this.supabase.signIn(login, password);
    if (signIn.error) {
      console.log(signIn.error);
    } else {
      // redirect to mainPage
      await this.profileService.fetchProfile();
      this.router.navigate(['/debtList']);
      console.log('login succesful');
    }
    this.loading = false;
  }
}
