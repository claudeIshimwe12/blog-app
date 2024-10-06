import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      // During prerendering, allow access or handle accordingly
      return of(true); // or of(false) to restrict access
    }
    return this.authService.user$.pipe(
      map((firebaseUser) => {
        if (firebaseUser) {
          return true;
        } else {
          this.router.navigate(['/sign-in']);
          return false;
        }
      })
    );
  }
}
