import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  @Input() orderNumber: number = 0;
  // orderNumber: String | undefined;
   orderNo = localStorage.getItem('orderNumber');
  // constructor(private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.orderNumber = params['orderNumber'];
  //   });
  // }
}
