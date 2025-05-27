import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/service/data.service'
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-data-user-dashboard',
  imports:[MatIconModule, MatProgressSpinnerModule],
  templateUrl: './data-user-dashboard.component.html',
  styleUrls: ['./data-user-dashboard.component.css']
})
export class DataUserDashboardComponent implements OnInit {
  lastUser: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadLastRegisteredUser();
  }

  loadLastRegisteredUser(): void {
    this.dataService.getLastUser().subscribe({
      next: (user) => {
        this.lastUser = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el último usuario registrado';
        this.loading = false;
        console.error(err);
      }
    });
  }

formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
}