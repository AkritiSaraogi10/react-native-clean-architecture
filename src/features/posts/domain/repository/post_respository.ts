import {IPost} from '../entities/post_entity'; // Importing IPost interface

// Abstract of methods which will be implemented in Data layer

// Interface defining methods for interacting with post data
export interface PostRepository {
  getPosts(): Promise<IPost[]>;
  getPost(): Promise<IPost>;
  addPost(postData: IPost): string;
  deletePost(postId: string): string;
}
