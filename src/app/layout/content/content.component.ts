import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-content',
  imports: [RouterOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  @Input() isSidebarCollapsed = false;


}
