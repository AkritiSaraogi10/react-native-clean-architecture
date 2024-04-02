import {Results} from 'realm';
import PostSchema from '../../../../core/local_DB/collections/post/post_schema';

// Abstract of methods which will be implemented in Data layer
export interface PostRepository {
  getPost(): Promise<Results<PostSchema>>;
  addPost(postData: PostSchema): Promise<void>;
  deletePost(postId: string): Promise<void>;
  getPosts(): Promise<Results<PostSchema>>;
  updatePost(postPartial: Partial<PostSchema>): Promise<void>;
}
