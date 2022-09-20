import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class IsSignedInGuard implements CanActivate {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.supabase.session ? true : this.router.navigate(['/login']);
  }
}
