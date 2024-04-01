import {Results} from 'realm';
import {IPost} from '../entities/post_entity'; // Importing IPost interface
import PostSchema from '../../../../shared/local_data/collections/post/post_schema';

// Abstract of methods which will be implemented in Data layer

// Interface defining methods for interacting with post data
export interface PostRepository {
  getPost(): Promise<IPost>;
  addPost(postData: IPost): Promise<void>;
  deletePost(postId: string): Promise<void>;
  getPosts(): Promise<Results<PostSchema>>;
  updatePost(postPartial: Partial<PostSchema>): Promise<void>;
}
