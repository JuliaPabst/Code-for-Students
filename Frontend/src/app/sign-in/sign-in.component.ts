import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  hide = true;
  isLoading = false;
  loginForm: FormGroup = this.fb.group({
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl("", [
      Validators.required
    ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
