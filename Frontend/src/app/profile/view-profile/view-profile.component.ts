import { Component } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  @Output() profileView = '';
}
