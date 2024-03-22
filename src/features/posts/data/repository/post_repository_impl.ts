import PostSchema from '../../../../shared/local_data/collections/post/post_schema';
import PostService from '../../../../shared/local_data/collections/post/post_service';
import {IPost} from '../../domain/entities/post_entity'; // Importing IPost interface
import {PostRepository} from '../../domain/repository/post_respository'; // Importing PostRepository interface
import {PostDataSource} from '../data_sources/post_data_source'; // Importing PostDataSource interface
import PostDto from '../dto/post_dto';

// Implementation of the PostRepository interface
export class PostRepositoryImpl implements PostRepository {
  dataSource: PostDataSource; // Data source(Returns API response) for retrieving post data
  postService: PostService; //realm service

  // _ in names should be used for private variables only
  constructor(_datasource: PostDataSource, _postService: PostService) {
    this.dataSource = _datasource; // Initializing data source
    this.postService = _postService;
  }

  // Method to retrieve multiple posts
  async getPosts(): Promise<IPost[]> {
    const result = await this.dataSource.getPosts(); // Getting posts from data source
    const posts: IPost[] = result.results.map((item: any) => {
      // Mapping Realm objects to IPost entities
      return PostDto.fromJson(item);
    });
    this.postService.addPosts(posts as unknown as PostSchema[]);
    return posts; // Returning posts
  }

  // Method to retrieve a single post
  async getPost(): Promise<IPost> {
    const result = await this.dataSource.getPost(); // Getting a post from data source
    return result.results; // Returning a post
  }

  // Method to add a new post (not implemented in this example)
  addPost(postData: IPost): string {
    return '';
  }

  // Method to delete a post (not implemented in this example)
  deletePost(postId: string): string {
    return '';
  }

  // Method to update a post in the Realm database
  updatePost(postData: Partial<IPost>) {}
}
