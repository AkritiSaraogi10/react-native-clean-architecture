import {container} from 'tsyringe';
import {PostRepository} from '../../features/posts/domain/repository/post_respository';
import {PostRepositoryImpl} from '../../features/posts/data/repository/post_repository_impl';
import {PostDataSource} from '../../features/posts/data/data_sources/post_data_source';
import PostDataApiImpl from '../../features/posts/data/data_sources/post_data_api_impl';

const postDiContainer = () => {
  container.register<PostDataSource>('PostDataSource', {
    useClass: PostDataApiImpl,
  });
  container.register<PostRepository>('PostRepository', {
    useClass: PostRepositoryImpl,
  });
};

export default postDiContainer;
