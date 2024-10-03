import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs/blogs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-blog-page',
  templateUrl: './create-blog-page.component.html',
  styleUrl: './create-blog-page.component.scss',
})
export class CreateBlogPageComponent implements OnInit {
  blogForm!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private blogsService: BlogsService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.blogForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.isLoading = true;
      const user = this.authService.currentUserSig();
      if (user) {
        this.blogsService
          .createBlog(
            user.username,
            this.blogForm.value.title,
            this.blogForm.value.description
          )
          .subscribe({
            next: () => {
              this.toastr.success('Blog created Successfully', 'Blog', {
                timeOut: 1500,
              });
              this.isLoading = false;
              this.router.navigateByUrl('/');
            },
            error: (err) =>
              this.toastr.error('Something went wrong 😒', 'Major Error', {
                timeOut: 1500,
              }),
          });
      }
    }
  }
}
