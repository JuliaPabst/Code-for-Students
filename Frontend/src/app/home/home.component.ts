import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  date?: string; // Assuming comments have dates as well
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  httpClient = inject(HttpClient);
  posts: Post[] = [];
  comments: Comment[] = [];

  ngOnInit(): void {
    this.fetchPosts();
    this.fetchComments();
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
        }));
        console.log(this.posts);
      }, error => {
        console.error('Error fetching posts:', error);
      });
  }

  fetchComments() {
    this.httpClient.get<Comment[]>('http://localhost:3000/comments')
      .subscribe((comments: Comment[]) => {
        console.log('Fetched comments:', comments);
        this.comments = comments;
        this.posts.forEach(post => {
          const postComments = this.comments.filter(comment => comment.postId === post._id);
          post.comments_count = postComments.length;
          post.showComments = false;
        });
      });
  }

  toggleComments(post: Post) {
    post.showComments = !post.showComments;
  }

  trackByPostId(index: number, post: Post): number {
    return post._id;
  }

  trackByCommentId(index: number, comment: Comment): number {
    return comment._id;
  }
}
