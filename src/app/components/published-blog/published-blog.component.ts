import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from '../../models/blog.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-published-blog',
  templateUrl: './published-blog.component.html',
  styleUrl: './published-blog.component.scss',
})
export class PublishedBlogComponent {
  @Input({ required: true }) blog!: Blog;
  @Output() deleteBlog: EventEmitter<string> = new EventEmitter<string>();
  showDialog: boolean = false;

  constructor(private router: Router) {}

  toggleDialog() {
    this.showDialog = !this.showDialog;
  }

  onDelete(id: string) {
    this.deleteBlog.emit(id);
    this.showDialog = false;
  }

  onEdit(id: string) {
    console.log('I got clicke');
    this.router.navigate(['/edit', id]);
  }
}
