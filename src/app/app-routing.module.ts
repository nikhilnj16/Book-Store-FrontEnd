import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisteredPageComponent } from './components/registered-page/registered-page.component';

const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch:'full'},
  {path: "home" , component:HomeComponent},
  {path: "cart" , component:CartComponent},
  {path: "order" , component:OrderComponent},
  {path: "login" , component:LoginComponent},
  {path: "signup" , component:SignupComponent},
  {path: "RegPage" , component:RegisteredPageComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
