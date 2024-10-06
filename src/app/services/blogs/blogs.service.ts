import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
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

  getDocumentById(docId: string): Observable<any> {
    const documentReference = doc(this.firestore, `blogs/${docId}`);
    return docData(documentReference);
  }

  updateBlog(blogId: string, dataToUpdate: Blog): Observable<void> {
    const docRef = doc(this.firestore, 'blogs/' + blogId);
    const promise = setDoc(docRef, dataToUpdate);
    return from(promise);
  }

  addComment(blogId: string, comment: Comment) {
    const docRef = doc(this.firestore, 'blogs/' + blogId);

    const promise = updateDoc(docRef, {
      comments: arrayUnion(comment),
    });

    return from(promise);
  }
}
