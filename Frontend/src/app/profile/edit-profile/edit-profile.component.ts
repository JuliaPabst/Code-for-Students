import { Component, output } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  @Output() profileView = '';
}
