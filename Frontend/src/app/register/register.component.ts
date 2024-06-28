import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importiere HttpClient und HttpClientModule

@Component({
  selector: 'app-register',
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
    HttpClientModule // Füge HttpClientModule zu den Imports hinzu
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  passwordMatchValidator: Validators = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');

    return password1 && password2 && password1.value !== password2.value
      ? { passwordMismatch: true }
      : null;
  };

  emailMatchValidator: Validators = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const email1 = control.get('email1');
    const email2 = control.get('email2');

    return email1 && email2 && email1.value !== email2.value
      ? { emailMismatch: true }
      : null;
  };

  email1 = '';
  email2 = '';
  password1 = '';
  password2 = '';
  hide = true;
  isLoading = false;
  signupFailed = false;

  registerForm: FormGroup = this.fb.group(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email1: new FormControl(this.email1, [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
      ]),
      email2: new FormControl(this.email2, [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
      ]),
      password1: new FormControl(this.password1, [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl(this.password2, [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    { validators: [this.passwordMatchValidator, this.emailMatchValidator] }
  );

  constructor(
    private fb: FormBuilder,
    private http: HttpClient // Injektieren des HttpClient
  ) {}

  ngOnInit(): void {}

  register() {
    const email1Control = this.registerForm.get('email1');
    const email2Control = this.registerForm.get('email2');
    const password1Control = this.registerForm.get('password1');
    const password2Control = this.registerForm.get('password2');

    if (
      email1Control?.errors?.['required'] || 
      email2Control?.errors?.['required'] ||
      password1Control?.errors?.['required'] ||
      password2Control?.errors?.['required']
    ) {
      this.signupFailed = true;
    } else {
      this.signupFailed = false;
    }

    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('Login successful.');

      const formData = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email1')?.value,
        password: this.registerForm.get('password1')?.value,
        text: this.registerForm.get('text')?.value
      };

      // Verwende HttpClient, um die Anmeldeinformationen zu senden
      this.http.post<any>('http://localhost:3000/api/users/register', formData).subscribe(
        (response) => {
          console.log('User registered:', response);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error in user Registration:', error);
          this.signupFailed = true;
          this.isLoading = false;
        }
      );

      this.signupFailed = false;
    } else {
      console.log('Login failed.');
      this.signupFailed = true;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get passwordMismatch(): boolean {
    return this.registerForm.hasError('passwordMismatch');
  }

  get emailMismatch(): boolean {
    return this.registerForm.hasError('emailMismatch');
  }
}
