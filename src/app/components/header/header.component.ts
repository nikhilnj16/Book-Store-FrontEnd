import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() cartItemCount: number = 0;
  userName: string = '';
  isDropdownOpen: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Retrieve user name and cart item count on component initialization
    this.getUserName();
    // Assuming you have a method to fetch cart item count as well
    
  }

  getUserName(): void {
    // Get token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Send token to backend to fetch user name
      const headers = new HttpHeaders().set('token', token);
      this.http.get<any>('http://localhost:8085/getUser', { headers:headers })
        .subscribe(
          response => {
            this.userName = response.userFirstName;
          },
          error => {
            console.error('Error fetching user name:', error);
          }
        );
    } else {
      console.error('Token is null');
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown
  }

  logout(): void {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
