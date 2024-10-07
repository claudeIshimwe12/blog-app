import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
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
      return of(true);
    }
    return this.authService.user$.pipe(
      map((firebaseUser) => {
        if (firebaseUser) {
          return true;
        } else {
          this.router.navigate(['/sign-in']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('AuthGuard Error:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
