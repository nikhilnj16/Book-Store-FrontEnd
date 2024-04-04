import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch:'full'},
  {path: "home" , component:HomeComponent},
  {path: "cart" , component:CartComponent},
  {path: "order" , component:OrderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
