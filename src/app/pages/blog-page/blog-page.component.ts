import { Component, inject } from '@angular/core';
import { Blog } from '../../models/blog.interface';
import { BlogsService } from '../../services/blogs/blogs.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from '../../models/blog.interface';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent {
  isLoading: boolean = false;
  blogId: string = '';
  blog$!: Observable<Blog>;
  authService = inject(AuthService);
  showCommentsModal: boolean = false;
  currUserName: string = this.authService.currentUserSig()?.username ?? '';
  comment: string = '';

  constructor(
    private blogsService: BlogsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.blogId = idParam ?? ''; // Coerse it to be empty string rather than being null
    });
    this.blog$ = this.blogsService.getDocumentById(this.blogId);
  }

  onOpenCommentModal() {
    this.showCommentsModal = true;
  }
  onCloseCommentModal() {
    this.showCommentsModal = false;
  }
  overridePropagation(event: MouseEvent) {
    event.stopPropagation();
  }
  onModalClick(event: MouseEvent) {
    event.stopPropagation();

    this.showCommentsModal = false;
  }
  onRespond() {
    const com: Comment = {
      commentAuthor: this.authService.currentUserSig(),
      comment: this.comment,
      commentedAt: String(new Date()),
    };
    if (this.comment.length > 2) {
      this.blogsService.addComment(this.blogId, com);
      this.comment = '';
    }
  }

  onLikeClick() {
    const userName: string = this.authService.currentUserSig()?.username ?? '';
    this.blogsService.likeBlog(this.blogId, userName);
  }
}
