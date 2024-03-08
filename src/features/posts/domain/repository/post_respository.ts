import {IPost} from '../entities/post_entity';

export interface PostRepository {
  getPosts(): Promise<IPost[]>;
  getPost(): Promise<IPost>;
}
