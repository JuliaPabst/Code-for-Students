class User {
    imageRef: string;
    name: string;
    description: string;
    status: string;
    date: Date;
    totalPosts: number;
    totalComments: number;
    constructor() {
        this.imageRef = "";
        this.name = "";
        this.description = "";
        this.status = "";
        this.date = new Date();
        this.totalPosts = 0;
        this.totalComments = 0;
    }
}