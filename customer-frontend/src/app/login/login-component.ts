import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // Make sure the path is correct


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-component.html',

  styleUrls: ['./login-component.scss']
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  username = '';
  password = '';
  showForgotPassword = false;
  recoveryEmail = '';
  recoveryMessage = '';

  onLogin() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(success => {
        if (success) {
          console.log('Login successful');
          this.router.navigate(['/customer-management']);
        } else {
          alert('Invalid username or password!');
        }
      });
    } else {
      alert('Please enter both username and password!');
    }
  }


  openForgotPassword() {
    this.showForgotPassword = true;
    this.recoveryEmail = '';
    this.recoveryMessage = '';
  }

  closeModal() {
    this.showForgotPassword = false;
  }

  submitRecoveryEmail() {
    if (this.recoveryEmail) {
      // Simulate backend call
      this.recoveryMessage =
        'If your email address is in our database, we will send you a link to recover your password.';
    } else {
      this.recoveryMessage = 'Please enter a valid email address.';
    }
  }
}


