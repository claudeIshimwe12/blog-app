import { Component, inject } from '@angular/core';
import { BlogsService } from '../../services/blogs/blogs.service';
import { map, Observable } from 'rxjs';
import { Blog } from '../../models/blog.interface';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  blogsService = inject(BlogsService);
  authService = inject(AuthService);
  user = this.authService.currentUserSig();
  email = this.user?.email;

  constructor(private toastr: ToastrService) {}

  blogs$: Observable<Blog[]> = this.blogsService
    .getBlogs()
    .pipe(map((blo) => blo.filter((b) => b.author.email === this.email)));

  deleteBlog(id: string) {
    this.blogsService.deleteBlog(id).subscribe({
      next: () =>
        this.toastr.success('Blog Deleted Successfully', 'Success', {
          timeOut: 1500,
        }),
      error: (err) =>
        this.toastr.error(`Something went wrong 😒 ${err.message}`, ' Error', {
          timeOut: 1500,
        }),
    });
  }
}
