import {Results} from 'realm';
import PostSchema from '../../../../shared/local_data/collections/post/post_schema';
import PostService from '../../../../shared/local_data/collections/post/post_service';
import store from '../../../../shared/presentation/redux/store';
import {IPost} from '../../domain/entities/post_entity';
import {PostRepository} from '../../domain/repository/post_respository';
import type {PostDataSource} from '../data_sources/post_data_source';
import PostDto from '../dto/post_dto';
import {inject, injectable, singleton} from 'tsyringe';

// Implementation of the PostRepository interface
@singleton()
@injectable()
export class PostRepositoryImpl implements PostRepository {
  private dataSource: PostDataSource; // Data source(Returns API response) for retrieving post data
  private postService: PostService; //realm service

  constructor(
    @inject('PostDataSource') datasource: PostDataSource,
    postService: PostService,
  ) {
    this.dataSource = datasource;
    this.postService = postService;
  }

  async getPosts(): Promise<Results<PostSchema>> {
    const internet = store.getState().internet.isConnected;

    if (internet) {
      const result = await this.dataSource.getPosts(); // api call
      const posts = result.results.map((item: PostDto) => {
        return PostSchema.fromJSON(item);
      });

      this.postService.addPosts(posts); // save to db
    }

    const postFromDB = this.postService.getPosts(); // return to screen

    return postFromDB;
  }

  // Method to retrieve a single post
  async getPost(): Promise<IPost> {
    const result = await this.dataSource.getPost(); // Getting a post from data source
    return result.results; // Returning a post
  }

  // Method to add a new post (not implemented in this example)
  async addPost(postData: PostSchema): Promise<void> {
    const internet = store.getState().internet.isConnected;

    // TODO: add api logic
    if (internet) {
      //  post to with api
      // this.dataSource.
    } else {
      this.postService.addPost(postData);
    }
  }

  // Method to delete a post (not implemented in this example)
  async deletePost(postId: string): Promise<void> {
    const internet = store.getState().internet.isConnected;
    // TODO: add api logic
    if (internet) {
    } else {
      this.postService.deletePost(postId);
    }
  }

  // Method to update a post in the Realm database
  async updatePost(postData: Partial<PostSchema>): Promise<void> {
    const internet = store.getState().internet.isConnected;
    // TODO: add api logic
    if (internet) {
      // replace this.
      return this.postService.updatePost(postData);
    } else {
      return this.postService.updatePost(postData);
    }
  }
}
