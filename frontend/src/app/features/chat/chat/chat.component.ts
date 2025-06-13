import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    RouterModule
  ]
})
export class ChatComponent {
  prompt = '';
  response = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient,private router: Router) {}

  sendPrompt() {
    this.response = '';
    this.error = '';
    this.loading = true;
    if (!this.prompt.trim()) {
      this.error = 'You must ask something.';
      return;
    }

    this.loading = true;

    const data = {
      prompt: this.prompt
    };

    this.http.post<any>(`${environment.apiUrl}/generate`, data).subscribe({
      next: (data) => {
        this.response = data.response || data.response || '';
        this.loading = false;
      },
      error: (err) => {
        if (err.error && err.error.detail) {
          this.error = err.error.detail;
        } else {
          this.error = 'Error connecting to server.';
        }
        this.loading = false;
      }
    });
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
