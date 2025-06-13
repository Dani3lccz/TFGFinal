import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMsg = ''; // Clears the message first
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.access_token) {
          this.router.navigate(['/chat']);
        } else {
          this.errorMsg = 'Wrong username or password';
        }
      },
      (error) => {
        if (error.status === 0) {
          // Network error / dead backend
          this.errorMsg = 'Couldnt connect to server.';
        } else if (error.status === 400) {
          // Invalid credentials
          this.errorMsg = 'Wrong Username or Password.';
        } else {
          // Other
          this.errorMsg = 'Unexepcted Error.';
        }
      }
    );
  }
}
