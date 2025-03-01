import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Product } from '../../product.model';
import { CartService } from '../../cart.service';
import { ProductService } from '../../product.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../comment.service';
import { Comment } from '../../comment.model';
import Swal from 'sweetalert2';

@Component({
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnChanges, OnInit { 
  
  @Input() productId: number | null = null;
  product: Product | undefined;
  commentForm!: FormGroup;
  comments: Comment[] = [];
  averageRating: number = 0; // Store the computed average rating

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder, 
    private commentService: CommentService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && this.productId !== null) {
      this.product = this.productService.getProductById(this.productId);
      this.loadComments(); // Reload comments when productId changes
    }
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      text: ['', Validators.required],
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    Swal.fire({
      title: `${product.name} added to cart!`,
      buttonsStyling: false,
      confirmButtonText: 'Hurray!',
      customClass: { confirmButton: 'btn btn-primary' },
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`
      }
    });
  }

  addComment() {
    if (this.commentForm.valid && this.productId !== null) {
      this.commentService.addComment(this.productId, this.commentForm.value);
      this.loadComments(); // Reload comments to update UI & average rating
      this.commentForm.reset({ rating: 5 });
    }
  }

  loadComments() {
    if (this.productId !== null) {
      this.comments = this.commentService.getComments(this.productId);
      this.calculateAverageRating(); // Compute the average rating after loading comments
    }
  }

  calculateAverageRating() {
    if (this.comments.length > 0) {
      const totalRating = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
      this.averageRating = totalRating / this.comments.length;
    } else {
      this.averageRating = 0;
    }
  }
}





// By injecting the ActivatedRoute, we are configuring the component to use a service.
// ngOnInit() is a lifecycle hook in Angular and it is a function that will load every time your component is loaded.
// In ngOnInit(), the route parameters correspond to the path variables we define in the route.
// this.route.snapshot.params['id'] - id param is coming from our route configuration:
// { path: 'details/:id', component: ProductDetailsComponent },

// Here, :id is a route parameter that dynamically holds the product ID.
//  The ActivatedRoute service fetches the route parameter (id).
//  The PRODUCTS array is searched for a product with a matching id using the find() method.
//  The result is stored in the product property.