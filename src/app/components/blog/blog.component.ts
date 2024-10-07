import { Component, inject, Input } from '@angular/core';
import { Blog } from '../../models/blog.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  @Input({ required: true }) blog!: Blog;
  authService = inject(AuthService);
  router = inject(Router);
  currUserName: string = this.authService.currentUserSig()?.username ?? '';

  onBlogClick() {
    this.router.navigate(['/blogs', this.blog.id]);
  }
}
