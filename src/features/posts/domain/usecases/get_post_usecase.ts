import { IPost } from '../entities/post_entity';
import { PostRepository } from '../repository/post_respository';

// Interface defining methods for getting posts
export interface GetPosts {
  getPosts(): Promise<IPost[]>; // Method to get multiple posts
  getPost(): Promise<IPost>; // Method to get a single post
}

// Implementation of the GetPosts interface
export class GetPostsUseCase implements GetPosts {
  postRepo: PostRepository; // Post repository instance

  constructor(_postRepo: PostRepository) {
    this.postRepo = _postRepo; // Initializing the post repository
  }

  // Delegating to the post repository of domain layer. which ws implemented in data layer and returned the data.
  
  // Method to get multiple posts
  async getPosts(): Promise<IPost[]> {
    return this.postRepo.getPosts();
  }

  // Method to get a single post
  async getPost(): Promise<IPost> {
    return this.postRepo.getPost();
  }
}
