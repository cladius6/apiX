export interface ICreateBlog {
    title: string;
    content: string;
}

export class CreateBlogDto implements ICreateBlog {
    title!: string;
    content!: string;
}