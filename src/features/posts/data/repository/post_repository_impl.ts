import {IPost} from '../../domain/entities/post_entity';
import {PostRepository} from '../../domain/repository/post_respository';
import {PostDataSource} from '../data_sources/post_data_source';

export class PostRepositoryImpl implements PostRepository {
  dataSource: PostDataSource;

  constructor(_datasource: PostDataSource) {
    this.dataSource = _datasource;
  }

  async getPosts(): Promise<IPost[]> {
    const result = await this.dataSource.getPosts();
    return result.results;
  }

  async getPost(): Promise<IPost> {
    const result = await this.dataSource.getPost();
    return result.results;
  }
}
