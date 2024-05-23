import { Component } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    EditProfileComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileView : string;
  constructor() {
    this.profileView = 'home';
  }
}
