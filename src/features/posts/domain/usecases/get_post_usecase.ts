import {Results} from 'realm';
import {IPost} from '../entities/post_entity';
import {PostRepository} from '../repository/post_respository';
import PostSchema from '../../../../shared/local_data/collections/post/post_schema';

// Interface defining methods for getting posts
export interface GetPosts {
  getPosts(): Promise<Results<PostSchema>>; // Method to get multiple posts
  getPost(): Promise<IPost>; // Method to get a single post
}

// Implementation of the GetPosts interface
export class PostsUseCase implements GetPosts {
  postRepo: PostRepository; // Post repository instance

  constructor(_postRepo: PostRepository) {
    this.postRepo = _postRepo;
  }

  // Delegating to the post repository of domain layer. which ws implemented in data layer and returned the data.

  // Method to get multiple posts
  async getPosts(): Promise<Results<PostSchema>> {
    return this.postRepo.getPosts();
  }

  // Method to get a single post
  async getPost(): Promise<IPost> {
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
