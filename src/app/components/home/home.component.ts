import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  books: any;
  cartItemCount: number = 0;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fetchBooks(); // Call the method to fetch books when the component initializes
  }

  fetchBooks() {
    this.http.get<any>('http://localhost:8085/getBook').subscribe({
      next: (response) => {
        console.log(response);
        this.books = response; // Assign the fetched books to the array
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
  });

  }
  addToCart(book: any): void {
    // Perform any logic related to adding the book to the cart
    // For example, you can update the addedToCart property of the book
    const token = localStorage.getItem('token');
    console.log(token)
    if(token != null){
    book.addedToCart = true;
    
    const body={
      "userId" : 1,
      "bookId" : book.bookId,
      "quantity" : 1
    }
    // You can also perform any other operations here, such as calling an API to add the book to the cart
    this.http.post('http://localhost:8085/cart/add/' + token,  body).subscribe({
      next: (response) => {
        console.log('Book added to cart:', response);
        this.cartItemCount++; // Increment cart item count
      },
      error: (error) => {
        console.error('Error adding book to cart:', error);
      }
    });
  } else{
    console.log("Token is null")
  }
  
  }
  }

