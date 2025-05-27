import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/service/data.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
})
export class TablaUsuarioComponent implements OnInit {
  users: any[] = [];
  totalUsers = 0;
  currentPage = 1;
  itemsPerPage = 5;
  readonly Math = Math;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.totalUsers = res.total;
      },
      error: (err) => console.error('Error:', err)
    });
  }
    toggleStatus(userId: string) {
    this.dataService.toggleUserStatus(userId).subscribe({
      next: (updatedUser) => {
        const userIndex = this.users.findIndex(u => u._id === updatedUser._id);
        if (userIndex !== -1) {
          this.users[userIndex].isActive = updatedUser.isActive;
        }
      },
      error: (err) => {
        console.error('Error al cambiar el estado:', err);
      }
    });
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.totalUsers / this.itemsPerPage);
  }
}