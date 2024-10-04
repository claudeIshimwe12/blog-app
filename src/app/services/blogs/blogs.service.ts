import { inject, Injectable } from '@angular/core';
import { User, user } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
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
    author: any,
    title: string,
    description: string
  ): Observable<string> {
    const blog = {
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

  deleteBlog(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'blogs/' + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
