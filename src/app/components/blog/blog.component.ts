import { Component, inject, Input, OnInit } from '@angular/core';
import { Blog } from '../../models/blog.interface';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  @Input({ required: true }) blog!: Blog;
  authService = inject(AuthService);
}
