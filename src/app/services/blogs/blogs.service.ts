import { inject, Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Blog, Comment } from '../../models/blog.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  firestore = inject(Firestore);
  blogsCollection = collection(this.firestore, 'blogs');

  getBlogs(): Observable<Blog[]> {
    return collectionData(this.blogsCollection, {
      idField: 'id',
    });
  }

  createBlog(
    author: string,
    title: string,
    description: string
  ): Observable<string> {
    const blog: Blog = {
      author,
      title,
      description,
      likes: 0,
      comments: [],
      createdAt: String(new Date()),
    };
    const promise = addDoc(this.blogsCollection, blog).then(
      (response) => response.id
    );
    return from(promise);
  }
}
