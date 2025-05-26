import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true;
  isLoading = false;
  model = { username: '', password: '' };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(form: NgForm): void {
    if (form.valid && !this.isLoading) {
      this.isLoading = true;
      
      this.authService.login(this.model.username, this.model.password).subscribe({
        next: () => {
          this.router.navigate(['/index/dashboard']);
          this.isLoading = false;
        },
        error: (error) => {
          alert(error.message);
          this.isLoading = false;
        }
      });
    }
  }
}