import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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

interface Post {
  _id: number;
  username: string;
  post_title: string;
  post_content: string;
  createdAt: string; // Assuming 'createdAt' is the field returned from your API
  likes: number;
  comments_count?: number;
  showComments?: boolean;
  formattedDate?: string;
}

interface Comment {
  _id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string; // Assuming comments have dates as well
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  httpClient = inject(HttpClient);
  posts: Post[] = [];
  comments: Comment[] = [];
  createComment: string = "";
  username: string | null = '';
  userId: number | null = null;

  ngOnInit(): void {
    this.fetchPosts();
  }

  constructor(private http: HttpClient) {
  }

  fetchPosts() {
    this.httpClient.get<Post[]>('http://localhost:3000/api/posts')
      .subscribe((posts: Post[]) => {
        this.posts = posts.map(post => ({
          ...post,
          createdAt: new Date(post.createdAt).toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by date
        console.log(this.posts);
      }, error => {
        console.error('Error fetching posts:', error);
      });
  }

  fetchComments(postId: number) {
    this.httpClient.get<Comment[]>('http://localhost:3000/api/comments/' + postId)
      .subscribe((comments: Comment[]) => {
        console.log('Fetched comments:', comments);
        this.comments = comments;
        this.comments = comments.map(comment => ({
          ...comment,
          createdAt: new Date(comment.createdAt).toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }));
        this.posts.forEach(post => {
          const postComments = this.comments.filter(comment => comment.postId === post._id);
          post.comments_count = postComments.length;
        });
      });
  }

  onSubmit(createForm: NgForm, post: Post) {
    this.username = sessionStorage.getItem('username');
    const userIdStr = sessionStorage.getItem('userId');
    if (userIdStr) {
      this.userId = parseInt(userIdStr, 10);
    }
    console.log('Retrieved username:', this.username);
    console.log('Retrieved userId:', this.userId);

    const Comment = {
      postId: post._id,
      name: this.username,
      email: this.username,
      body:  this.createComment 
    };

    this.http.post('http://localhost:3000/api/comments', Comment)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error('Error creating post:', error);
      });
  }

  toggleComments(post: Post) {
    post.showComments = !post.showComments;
    this.fetchComments(post._id);
  }

  trackByPostId(index: number, post: Post): number {
    return post._id;
  }

  trackByCommentId(index: number, comment: Comment): number {
    return comment._id;
  }
}
