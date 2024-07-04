import { Component } from '@angular/core';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
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
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  createTitle: string;
  createCode: string;
  username: string | null = '';
  userId: number | null = null;

  constructor(private http: HttpClient) {
    this.createTitle = '';
    this.createCode = '';
  }

  onSubmit(createPostForm: NgForm) {
    this.username = sessionStorage.getItem('username');
    const userIdStr = sessionStorage.getItem('userId');
    if (userIdStr) {
      this.userId = parseInt(userIdStr, 10);
    }
    console.log('Retrieved username:', this.username);
    console.log('Retrieved userId:', this.userId);

    const postData = {
      username: this.username, 
      post_title: this.createTitle,
      post_content: this.createCode
    };

    this.http.post('http://localhost:3000/api/posts/create', postData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error('Error creating post:', error);
      });
  }
}
