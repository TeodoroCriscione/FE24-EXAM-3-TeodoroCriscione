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
  private comments: { [productId: number]: Comment[] } = {};
  private averageRatings: { [productId: number]: number } = {}; // Store average ratings

  addComment(productId: number, comment: Comment) {
    if (!this.comments[productId]) {
      this.comments[productId] = [];
    }
    this.comments[productId].push(comment);
    this.updateAverageRating(productId);
  }

  getComments(productId: number): Comment[] {
    return this.comments[productId] || [];
  }

  updateAverageRating(productId: number) {
    const productComments = this.comments[productId] || [];
    if (productComments.length > 0) {
      const totalRating = productComments.reduce((sum, c) => sum + c.rating, 0);
      this.averageRatings[productId] = totalRating / productComments.length;
    } else {
      this.averageRatings[productId] = 0;
    }
  }

  getAverageRating(productId: number): number {
    return this.averageRatings[productId] || 0;
  }
}