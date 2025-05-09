import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS } from './sidebar.config';
import { NavItem } from './sidebar.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor() {
    console.log('navItems:', this.navItems);
  }
  
  @Input() isCollapsed = false;
  @Output() isCollapsedChange = new EventEmitter<boolean>();

  navItems: NavItem[] = NAV_ITEMS;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }
}