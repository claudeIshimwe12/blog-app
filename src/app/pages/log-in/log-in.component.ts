import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent implements OnInit {
  signInForm!: FormGroup;
  public submitted = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get email(): AbstractControl | null {
    return this.signInForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signInForm.get('password');
  }

  submitSignIn(): void {
    this.submitted = true;

    if (this.signInForm.invalid) {
      return;
    }

    const email: string = this.signInForm.value.email;
    const password: string = this.signInForm.value.password;

    this.authService.logIn(email, password).subscribe(
      (response) => {
        console.log('Sign-In Successful', response);
        // reset the form and navigate to another page
        this.router.navigateByUrl('/');
        this.signInForm.reset();
        this.submitted = false;
      },
      (error) => {
        if (error.message.includes('credential')) {
          this.error = 'Invalid Credentials';
        } else {
          console.log(error.message);
          this.error = 'Something went wrong';
        }
      }
    );
  }

  /**
   * Handles Google Sign-In.
   */
  signInWithGoogle(): void {
    console.log('sign in with google clicked');
    this.authService.loginWithGoogle();
  }
}
