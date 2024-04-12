import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {




signupForm: FormGroup;
errorMessage: string = '';

constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private router: Router
) {
  this.signupForm = this.formBuilder.group({
    userFirstName: ['', [Validators.required]],
    userLastName: ['', [Validators.required]],
    userEmailId: ['', [Validators.required, Validators.email]],
    userPassword: ['', [Validators.required]],
    userAge: ['', [Validators.required]],
    userGender: ['', [Validators.required]],    
  });
}

onSubmit(): void {
  if (this.signupForm.invalid) {
    this.errorMessage = 'Please fill in all required fields.';
    return;
  }
  console.log(this.signupForm.value)

  this.http.post<any>('http://localhost:8085/register', this.signupForm.value)
    .subscribe(
      response => {
        
        if(response.Status === "OK"){
          
        // Redirect to the desired page, e.g., home page
        this.router.navigate(['/RegPage']);
        }
        
      },
      error => {
        // Handle login error
        console.error('SignUp failed:', error);
        // Optionally, display an error message to the user
        this.errorMessage = 'An error occurred while signing up. Please try again later.';
      }
    );
}
}
