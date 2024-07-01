import { Component, Input,  OnInit, } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  @Output() changeView = new EventEmitter<string>();
  @Input() viewUserData: object

  constructor() {
    this.viewUserData = {}
  }

  onChangeView(){
    this.changeView.emit('edit-profile');
  }
}

// fetch user profile from db
/*
export class ViewProfileComponent implements OnInit {
  @Output() changeView = new EventEmitter<string>();
  @Input() username: string; // Input to accept username

  viewUserData: any = {};

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile(this.username);
  }

  fetchUserProfile(username: string) {
    this.httpClient.get(`http://localhost:3000/api/users/profile/${username}`)
      .subscribe((data: any) => {
        console.log('Fetched user profile:', data);
        this.viewUserData = data;
      }, error => {
        console.error('Error fetching user profile:', error);
      });
  }

  editUserProfile(updatedData: { description: string; status: string }) {
    this.httpClient.post(`http://localhost:3000/api/users/profile/${this.username}`, updatedData)
      .subscribe((response: any) => {
        console.log('Updated user profile:', response);
        this.fetchUserProfile(this.username); // Refresh the profile data after update
      }, error => {
        console.error('Error updating user profile:', error);
      });
  }

  onChangeView() {
    this.changeView.emit('edit-profile');
  }
}
*/
