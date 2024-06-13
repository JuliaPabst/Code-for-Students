import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postTitle: string;
  postText: string;

  constructor() {
    this.postTitle = '';
    this.postText = '';
  }
}
