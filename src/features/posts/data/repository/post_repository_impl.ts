import {IPost} from '../../domain/entities/post_entity';
import {PostRepository} from '../../domain/repository/post_respository';
import {PostDataSource} from '../data_sources/post_data_source';

export class PostRepositoryImpl implements PostRepository {
  dataSource: PostDataSource;

  constructor(_datasource: PostDataSource) {
    this.dataSource = _datasource;
  }

  async getPosts(): Promise<IPost[]> {
    return this.dataSource.getPosts();
  }
  getPost(): IPost {
    return this.dataSource.getPost();
  }
}
