import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly profileService: ProfileService,
    private readonly supabaseService: SupabaseService
  ) {}

  noHeaderRoutes = ['/login', '/register'];
  displayHeader = true;
  username!: string;
  pageName!: string;

  aliases = [
    {
      url: '/debtList',
      alias: 'Feuilles de dettes',
    },
    {
      url: '/mainPage',
      alias: 'Tableau de bord',
    },
  ];

  async ngOnInit(): Promise<void> {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.displayHeader = !this.noHeaderRoutes.some(
          (route) => this.router.url === route
        );
        const profile = await this.profileService.getProfile();
        this.username = profile.username;
        this.getSheetName(this.router.url);
      }
    });
  }

  getSheetName(url: string) {
    const regex = new RegExp(`${url.split('/')[1]}`);
    this.pageName =
      this.aliases.find((urls) => regex.test(urls.url))?.alias || 'Accueil';
  }

  signOut() {
    this.supabaseService
      .signOut()
      .then(() => {
        this.router.navigate(['/']);
        console.log('success');
      })
      .catch(() => {
        console.log('error');
      });
  }
}
