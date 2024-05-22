class Post {
    likes: number;
    user: string;
    createDate: Date;
    post: string;
    comments: number;
    constructor() {
        this.likes = 0;
        this.user = "";
        this.createDate = new Date();
        this.post = "";
        this.comments = 0;
    }
}