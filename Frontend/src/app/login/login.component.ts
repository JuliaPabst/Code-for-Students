import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NgIf,
    HttpClientModule
  ],
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  errorMessage = '';
  loginSuccess = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.error('Email and password are required');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.http.post<any>('http://localhost:3000/api/users/login', { email, password }).subscribe(
      (response) => {
        console.log('Login successful:', response);
        if (response.message === 'Login successful') { // Check for the specific message
          this.loginSuccess = true; // Set login success to true
          console.log('Login success set to true');
          sessionStorage.setItem('username', response.user.username); // Save username to sessionStorage
          sessionStorage.setItem('userId', response.user._id);
        } else {
          console.error('Unexpected response:', response);
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error logging in:', error);
        this.loginSuccess = false; // Ensure it's false in case of error
        this.cdr.detectChanges();
      }
    );
  }
}
