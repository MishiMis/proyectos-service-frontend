import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isMenuOpen = false;

  toggleUserMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeUserMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    console.log('Sesión cerrada');
  }
}