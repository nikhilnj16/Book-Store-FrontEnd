import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  
  orderNumber = 0
  no_of_books = 1;
  books: any[] = [];
  router: any;
  totalCost(): number{
    let totalCost = 0;
    for (const book of this.books) {
      totalCost += book.bookEntity.bookPrice * book.cartQuantity;
    }
    return totalCost;
  }

  totalQuantity(): number{
    let totalQuantity = 0;
    for (const book of this.books) {
      totalQuantity += book.cartQuantity;
    }
    return totalQuantity;
  }
  customerDetailsForm: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.customerDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      pincode: ['', Validators.required],
      locality: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      landmark: [''],
      type: ['', Validators.required]
    })
  }
  

  ngOnInit(): void {
    this.getBooksForUser();
  }

  getBooksForUser(): void {
    // Assuming you have a logged-in user with user ID stored in localStorage or another mechanism
    // const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      
      this.http.get<any[]>(`http://localhost:8085/cart/CartByUser/${token}`).subscribe({
        next: (response) => {
          console.log(response);
          this.books = response;
        },
        error: (error) => {
          console.error('Error fetching books for user:', error);
        }
      });
    }
  }

  subtraction(book : any){
    if(book.cartQuantity > 1){
      book.cartQuantity--;
      this.updateCartQuantity(book);
    }
    
    
  }
  addition(book : any){
    book.cartQuantity++;
    this.updateCartQuantity(book);
  }

  updateCartQuantity(book: any): void {
    // const userId = localStorage.getItem('userId');
    const userId = 1;
    const cartId = book.cartId

    if (userId) {
      // const payload = {
      //    // Assuming your book object has an id field
      //   quantity: book.cartQuantity
      // };
      const quantity = book.cartQuantity
      const body= { 

      } 
      

      this.http.put(`http://localhost:8085/cart/updateQty/${userId}/${cartId}/${quantity}`, body).subscribe({
        next: (response) => {
          console.log('Cart quantity updated:', response);
        },
        error: (error) => {
          console.error('Error updating cart quantity:', error);
        }
      });
    }
  }
  showCustomerDetails: boolean = false;
  showOrdSummary: boolean = false;

  showAddressToFill(): void {
    this.showCustomerDetails = true;
  }
  showOrderSummary() : void {
    this.showOrdSummary = true;
    
  }
  removeCartItem(book: any): void {
    // Send DELETE request to backend to remove the cart item

    this.http.delete<any>(`http://localhost:8085/cart/remove/${book.cartId}`)
      .subscribe(
        response => {
          // Handle success response, for example, remove the item from the books array
          const index = this.books.indexOf(book);
          if (index !== -1) {
            this.books.splice(index, 1);
          }
        },
        error => {
          // Handle error response
          console.error('Error removing cart item:', error);
        }
      );
  }

  checkout(): void {
    const token = localStorage.getItem('token');
    const orderData = {
      "orderPrice" : this.totalCost(),
      "orderQuantity" : this.totalQuantity(),
      "orderCancel" : false,
      
    }
    this.http.post<any>(`http://localhost:8085/order/placeOrder/${token}`, orderData)
      .subscribe(
        response => {
          console.log('Order placed successfully:', response);
          // Optionally, perform any additional actions after placing the order
          // For example, navigate to the order confirmation page
          // this.router.navigate(['/order-confirmation']);
          
          localStorage.setItem('orderNumber', response.object);
        },
        error => {
          console.error('Failed to place order:', error);
          
          // Optionally, handle any errors that occur during the request
        }
      );
      
  }

}
