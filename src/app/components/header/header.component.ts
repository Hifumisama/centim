import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  @Input() user: any;

  ngOnInit(): void {}
  logout() {
    this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}
