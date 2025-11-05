interface Comment {
    _id: string;
    id:string;
    parent:string;
    author: string;
    text: string;
    date: string;
    likes: number;
    image: string;
    children?:Comment[]
}