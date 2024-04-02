import {Lifecycle, container} from 'tsyringe';
import Database from '../local_DB/core/Database';
import postDiContainer from '../../features/posts/post_DI_container';

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
  postDiContainer();
})();
