import {Results} from 'realm';
import type {PostRepository} from '../repository/post_respository';
import PostSchema from '../../../../core/local_DB/collections/post/post_schema';
import {injectable, singleton, inject} from 'tsyringe';

export interface IGetPosts {
  getPosts(): Promise<Results<PostSchema>>;
  getPost(): Promise<Results<PostSchema>>;
}

@singleton()
@injectable()
export class PostsUseCase implements IGetPosts {
  postRepo: PostRepository;

  constructor(@inject('PostRepository') _postRepo: PostRepository) {
    this.postRepo = _postRepo;
  }

  async getPosts(): Promise<Results<PostSchema>> {
    return this.postRepo.getPosts();
  }

  async getPost(): Promise<Results<PostSchema>> {
    return this.postRepo.getPost();
  }

  async addPost(postData: PostSchema): Promise<void> {
    return this.postRepo.addPost(postData);
  }
  async deletePost(postId: string): Promise<void> {
    return this.postRepo.deletePost(postId);
  }
  async updatePost(postData: Partial<PostSchema>): Promise<void> {
    return this.postRepo.updatePost(postData);
  }
}
