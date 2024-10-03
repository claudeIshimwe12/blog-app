import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  @Input({ required: true }) blog!: Blog;
}
