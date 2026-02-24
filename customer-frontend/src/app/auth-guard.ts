import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Protects routes from unauthenticated access.
   * If the user is not logged in, redirects to /login and preserves the attempted URL.
   */
  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean {
    const attemptedUrl = state?.url ?? '/';

    if (this.authService.isLoggedIn()) {
      return true;
    }

    // redirect to login with redirect query param
    this.router.navigate(['/login'], { queryParams: { redirectTo: attemptedUrl } });
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
