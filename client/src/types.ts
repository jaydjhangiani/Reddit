export interface Post{
    identifier: string;
    title: string;
    body: string;
    username: string;
    slug: string;
    subName: string;
    createdAt: string;
    updatedAt: string;
    //virtual fields
    url: string;
}