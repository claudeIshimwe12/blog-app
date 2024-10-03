import { Component, inject, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs/blogs.service';
import { Blog } from '../../models/blog.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  blogsService = inject(BlogsService);
  blogs$: Observable<Blog[]> = this.blogsService.getBlogs();
}
