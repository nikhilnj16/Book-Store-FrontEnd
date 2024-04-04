import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  no_of_books = 1;
  constructor(){

  }

  subtraction(){
    if(this.no_of_books != 0){
      this.no_of_books = this.no_of_books - 1;
    }
    
    
  }
  addition(){
    this.no_of_books = this.no_of_books + 1;
  }

  showAddressToFill(){
    
  }


}
