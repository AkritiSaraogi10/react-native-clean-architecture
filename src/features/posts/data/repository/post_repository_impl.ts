import {Results} from 'realm';
import PostSchema from '../../../../core/local_DB/collections/post/post_schema';
import PostService from '../../../../core/local_DB/collections/post/post_service';
import store from '../../../../shared/presentation/redux/store';
import {PostRepository} from '../../domain/repository/post_respository';
import type {PostDataSource} from '../data_sources/post_data_source';
import PostDto from '../dto/post_dto';
import {inject, injectable, singleton} from 'tsyringe';
import {ServerException} from '../../../../core/errors/server_exceptions';

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
    try{
      try {
        const result = await this.dataSource.getPosts(); // api call
        const posts = result.results.map((item: PostDto) => {
          return PostSchema.fromJSON(item);
        });

        this.postService.addPosts(posts); // save to db

        const postFromDB = this.postService.getPosts(); // return to screen
        return postFromDB;
      } catch (e) {
        const postFromDB = this.postService.getPosts(); // return to screen
        return postFromDB;
      } 
     } catch (e) {
      throw new ServerException('Unable to get data from API or Local DB', 500);
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
    } catch {
      throw new ServerException('Unable to get data from API or Local DB', 500);
    }
  }

  async addPost(postData: PostSchema): Promise<void> {

    try {
      // TODO: add api logic
      //if (internet) {
        //this.dataSource.addPost();
      //}
      this.postService.addPost(postData);
    } catch (e) {
      throw new ServerException('Unable to add data to API or Local DB', 500);
    } 
  }

  async deletePost(postId: string): Promise<void> {

    try {
      // TODO: delete api logic
      //if (internet) {
        //this.dataSource.deletePost();
      //}
      this.postService.deletePost(postId);
    } catch (e) {
      throw new ServerException('Unable to add data to API or Local DB', 500);
    } 
  }

  async updatePost(postData: Partial<PostSchema>): Promise<void> {

    try {
      // TODO: update api logic
      //if (internet) {
        //this.dataSource.updatePost();
      //}
      this.postService.updatePost(postData);
    } catch (e) {
      throw new ServerException('Unable to add data to API or Local DB', 500);
    } 
  }
}
