import { Component } from '@angular/core';
import { DataUserDashboardComponent } from '../data-user-dashboard/data-user-dashboard.component';

@Component({
  selector: 'app-dashboard',
  imports: [DataUserDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
