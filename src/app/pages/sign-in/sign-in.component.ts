import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  registerForm!: FormGroup;
  public submitted = false;
  error: string | null = null;
  OauthLoader: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: this.passwordMatchValidator(),
      }
    );
  }

  private passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      if (!(form instanceof FormGroup)) {
        return null;
      }

      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        form.get('confirmPassword')?.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        const errors = form.get('confirmPassword')?.errors;
        if (errors) {
          delete errors['mismatch'];
          if (Object.keys(errors).length === 0) {
            form.get('confirmPassword')?.setErrors(null);
          } else {
            form.get('confirmPassword')?.setErrors(errors);
          }
        }
        return null;
      }
    };
  }
  get username(): AbstractControl | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

  submitRegistration(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const username = this.registerForm.value.username;
    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.isLoading = false;
        if (error.message.includes('email')) {
          this.error = 'Email already registered';
        }
      },
    });
  }

  signUpWithGoogle(): void {
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
