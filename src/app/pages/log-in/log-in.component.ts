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
  isLoading: boolean = false;
  OauthLoader: boolean = false;

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
    this.isLoading = true;
    this.authService.logIn(email, password).subscribe(
      () => {
        this.isLoading = false;
        // reset the form and navigate to another page
        this.router.navigateByUrl('/');
        this.signInForm.reset();
        this.submitted = false;
      },
      (error) => {
        this.isLoading = false;
        if (error.message.includes('credential')) {
          this.error = 'Invalid Credentials';
        } else {
          console.log(error.message);

          this.error = 'Something went wrong';
        }
      }
    );
  }

  signInWithGoogle(): void {
    this.OauthLoader = true;
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.OauthLoader = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.OauthLoader = false;
        this.error = 'Pop Up Closed, please try again 🙏';
      },
    });
  }
}
