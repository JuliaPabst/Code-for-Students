import { Component } from '@angular/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    EditProfileComponent,
    ViewProfileComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileView : string;
  constructor() {
    this.profileView = 'view';
  }
}
