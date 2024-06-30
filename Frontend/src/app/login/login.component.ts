import { Component } from '@angular/core';
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
    HttpClientModule // Importiere HttpClientModule
  ],
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private http: HttpClient) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  hide = true;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.invalid) {
      console.error('Email and password are required');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.http.post<any>('http://localhost:3000/api/users/login', { email, password }).subscribe(
      (response) => {
        console.log('Login successful:', response);
      },
      (error) => {
        console.error('Error logging in:', error);
      }
    );
  }
}
