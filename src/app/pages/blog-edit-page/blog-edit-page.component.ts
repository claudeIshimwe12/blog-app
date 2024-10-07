import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs/blogs.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../../models/blog.interface';

@Component({
  selector: 'app-blog-edit-page',
  templateUrl: './blog-edit-page.component.html',
  styleUrl: './blog-edit-page.component.scss',
})
export class BlogEditPageComponent implements OnInit {
  blogForm!: FormGroup;
  isLoading: boolean = false;
  blogId: string = '';
  blog!: Blog;
  constructor(
    private blogsService: BlogsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.blogId = idParam ?? ''; // Coerse it to be empty string rather than being null
    });
    this.blogsService.getDocumentById(this.blogId).subscribe((b) => {
      this.blog = b;
      this.patchValues(b.title, b.description);
    });
  }

  patchValues(title: string, description: string) {
    this.blogForm.patchValue({
      title: title,
      description: description,
    });
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
          .updateBlog(this.blogId, {
            title: this.blogForm.value.title,
            description: this.blogForm.value.description,
            author: this.blog.author,
            comments: [],
            likes: this.blog.likes,
            createdAt: this.blog.createdAt,
            id: this.blogId,
          })
          .subscribe({
            next: () => {
              this.toastr.success('Blog Update Successfully', 'Success', {
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
