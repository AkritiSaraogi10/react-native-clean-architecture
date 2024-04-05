import {Results} from 'realm';
import PostSchema from '../../../../core/local_DB/collections/post/post_schema';
import PostService from '../../../../core/local_DB/collections/post/post_service';
import {PostRepository} from '../../domain/repository/post_respository';
import type {PostDataSource} from '../data_sources/post_data_source';
import PostDto from '../dto/post_dto';
import {inject, injectable, singleton} from 'tsyringe';

@singleton()
@injectable()
export class PostRepositoryImpl implements PostRepository {
  private dataSource: PostDataSource; // Data source(Returns API response) for retrieving post data
  private postService: PostService;

  constructor(
    @inject('PostDataSource') datasource: PostDataSource,
    postService: PostService,
  ) {
    this.dataSource = datasource;
    this.postService = postService;
  }

  async getPosts(): Promise<Results<PostSchema>> {
    try {
      try {
        const result = await this.dataSource.getPosts(); // api call
        const posts = result.results.map((item: PostDto) => {
          return PostSchema.fromJSON({
            ...item,
            authorId: 'A6B783D3952524CFD8E4F11701DF3363',
          });
        });

        this.postService.addPosts(posts); // save to db

        const postFromDB = this.postService.getPosts(); // return to screen

        return postFromDB;
      } catch (e) {
        const postFromDB = this.postService.getPosts(); // return to screen
        return postFromDB;
      }
    } catch (e) {
      throw e;
    }
  }

  async getPost(): Promise<Results<PostSchema>> {
    try {
      try {
        const result = await this.dataSource.getPost();
        const post = PostSchema.fromJSON(result.results);

        this.postService.addPost(post); // save to db

        const postFromDB = this.postService.getPost(); // return to screen

        return postFromDB;
      } catch (e) {
        const postFromDB = this.postService.getPost(); // return to screen
        return postFromDB;
      }
    } catch (e) {
      throw e;
    }
  }

  async addPost(postData: PostSchema): Promise<void> {
    try {
      await this.dataSource.addPost(postData); // api
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      this.postService.addPost(postData); //realm
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      // TODO: delete api logic
      //if (internet) {
      //this.dataSource.deletePost();
      //}
      await this.dataSource.deletePost(postId);
    } catch (e) {
      throw e;
    } finally {
      this.postService.deletePost(postId);
    }
  }

  async updatePost(postData: Partial<PostSchema>): Promise<void> {
    try {
      // TODO: update api logic
      //if (internet) {
      //this.dataSource.updatePost();
      //}
      await this.dataSource.updatePost(postData);
    } catch (e) {
      throw e;
    } finally {
      this.postService.updatePost(postData);
    }
  }
}
