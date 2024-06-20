import { Component, Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [],
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
