import { Component, Input } from '@angular/core';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ViewProfileComponent,
    EditProfileComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileView: string = 'view-profile';
  userData: {
    username: string,
    description: string,
    status: string
  };

  constructor() {
    this.userData = {
      "username": '',
      "description": '',
      "status": ''
    };
  }

  handleChangeView(newView: string){
    this.profileView = newView;
  }

  handleSubmit(data: object){
  }
}
