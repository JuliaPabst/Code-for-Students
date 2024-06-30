import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HttpClientModule, NgIf],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

httpClient = inject(HttpClient);
posts :any [] = [];
comments :any [] = [];
comments_count : number = 0;
show_comments : boolean = false;

ngOnInit(): void {
    this.fetchPosts();
    this.fetchComments();
} 
fetchPosts(){
this.httpClient
/* .get('https://jsonplaceholder.typicode.com/posts') */
.get('http://localhost:5000/posts')
.subscribe((posts : any)=>{
console.log(posts);
this.posts = posts;
})
}
fetchComments() {
this.httpClient
.get('http://localhost:5000/comments')
.subscribe((comments: any) => {
this.comments = comments;
this.posts.forEach(post => {
const postComments = this.comments.filter(comment => comment.postId === post.id);
post.comments_count = postComments.length;
post.showComments = false; 
});
})
}
toggleComments(post: any) {
    post.showComments = !post.showComments;
    }
}

