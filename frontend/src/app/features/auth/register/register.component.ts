import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.error = '';
    this.success = '';

    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };

this.http.post<any>(`${environment.apiUrl}/register`, data).subscribe({
  next: (data) => {
    // Succesfull register
    this.success = 'Succesfully registered, going back to login...';
    this.error = '';
      setTimeout(() => {this.router.navigate(['/login']);}, 2000); // Wait 2 seconds before redirecting
  },
  error: (err) => {
    if (err.status === 422 && err.error.detail) {
      this.error = 'Incorrect input/format';
    } else if (err.status === 400 || err.status === 409) {
      this.error = err.error.detail || 'Error during register.';
    } else {
      this.error = 'Could not register';
    }
  }
});
  }
}
