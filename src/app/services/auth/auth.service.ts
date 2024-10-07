import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fireAuth = inject(Auth);
  user$ = user(this.fireAuth);

  currentUserSig = signal<User | undefined | null>(undefined);

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.fireAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  logIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.fireAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  // Log In with Google

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.fireAuth, provider).then(() => {});

    return from(promise);
  }
  logout(): Observable<void> {
    const promise = signOut(this.fireAuth);

    return from(promise);
  }
}
