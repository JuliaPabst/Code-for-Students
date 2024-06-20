import { Component, output } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  NgForm,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  @Output() changeView = new EventEmitter<string>();
  @Output() passUserData = new EventEmitter<{"username": string, "description": string, "status": string}>();

  editUsername: string;
  editDescription: string;
  editStatus: string;

  constructor() {
    this.editUsername = '';
    this.editDescription = '';
    this.editStatus = '';
  }

  onChangeView(){
    this.changeView.emit('view-profile');
  }

  onSubmit(){
    this.onChangeView();
    const userData: {
      "username": string,
      "description": string,
      "status": string
    } = {
      "username": this.editUsername,
      "description": this.editDescription,
      "status": this.editStatus
    };
    console.log(userData);
    this.passUserData.emit(userData);
  }
}
