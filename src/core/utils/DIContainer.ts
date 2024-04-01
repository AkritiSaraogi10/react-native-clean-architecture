import {Lifecycle, container} from 'tsyringe';
import Database from '../../shared/local_data/network/Database';
import {PostRepository} from '../../features/posts/domain/repository/post_respository';
import {PostRepositoryImpl} from '../../features/posts/data/repository/post_repository_impl';
import {PostDataSource} from '../../features/posts/data/data_sources/post_data_source';
import PostDataApiImpl from '../../features/posts/data/data_sources/post_data_api_impl';

(() => {
  container.register<Database>(
    Database,
    {
      useClass: Database,
    },
    {
      lifecycle: Lifecycle.Singleton,
    },
  );

  container.register<PostDataSource>('PostDataSource', {
    useClass: PostDataApiImpl,
  });
  container.register<PostRepository>('PostRepository', {
    useClass: PostRepositoryImpl,
  });
})();
