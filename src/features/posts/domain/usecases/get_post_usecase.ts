import {IPost} from '../entities/post_entity';
import {PostRepository} from '../repository/post_respository';

export interface GetPosts {
  getPosts(): Promise<IPost[]>;
  getPost(): Promise<IPost>;
}

export class GetPostsUseCase implements GetPosts {
  postRepo: PostRepository;

  constructor(_postRepo: PostRepository) {
    this.postRepo = _postRepo;
  }
  async getPosts(): Promise<IPost[]> {
    return this.postRepo.getPosts();
  }

  async getPost(): Promise<IPost> {
    return this.postRepo.getPost();
  }
}
