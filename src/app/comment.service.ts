import { Injectable } from '@angular/core';

export interface Comment {
  name: string;
  email: string;
  rating: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private comments: { [productId: number]: Comment[] } = {}; // Use productId as key

  addComment(productId: number, comment: Comment) {
    if (!this.comments[productId]) {
      this.comments[productId] = [];
    }
    this.comments[productId].push(comment);
  }

  getComments(productId: number): Comment[] {
    return this.comments[productId] || [];
  }
}

