import { Component, OnInit, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-history',
  standalone: true,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
imports: [
  CommonModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  RouterModule,
  MatButtonModule
]
})
export class HistoryComponent implements OnInit {
  history: any[] = [];
  loading = false;
  error = '';

constructor(private http: HttpClient,private router: Router) {}
dataSource = new MatTableDataSource<any>();
columns: string[] = ['date', 'prompt', 'response'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

ngOnInit(): void {
  this.loadHistory();
}

loadHistory() {
  this.http.get<any>(`${environment.apiUrl}/history`).subscribe({
    next: (data) => {
      const list = Array.isArray(data) ? data : data.history;
      this.history = list;
      this.dataSource.data = list;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Could not load history.';
      this.loading = false;
    }
  });
  }
logout() {
   localStorage.removeItem('token');
   this.router.navigate(['/login']);
}  
}
