import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userEmailId: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value)

    this.http.post<any>('http://localhost:8085/user/login', this.loginForm.value)
      .subscribe(
        response => {
          if(response.Status === "OK" && response.token){
            console.log('Login successful');
            localStorage.setItem('token', response.token);
            console.log(response.token)
          // Redirect to the desired page, e.g., home page
          this.router.navigate(['/home']);
          } else{
            console.error('Login failed:', response.error);
          }
          
        },
        error => {
          // Handle login error
          console.error('HTTP error:', error);
          // Optionally, display an error message to the user
        }
      );
  }
}
