import {Results} from 'realm';
import RealmService from '../../core/realm_service';
import PostSchema from './post_schema';
import {injectable} from 'tsyringe';
import { SCHEMA_NAMES } from '../../../utils/constants/constants';

@injectable()
class PostService {
  private realmService: RealmService<PostSchema>;

  constructor(realmService: RealmService<PostSchema>) {
    this.realmService = realmService;
  }

  addPost(postData: PostSchema) {
    this.realmService.addObjectToRealm(SCHEMA_NAMES.POST, postData);
  }

  addPosts(postData: PostSchema[]) {
    this.realmService.addObjectsToRealm(SCHEMA_NAMES.POST, postData);
  }

  updatePost(postData: Partial<PostSchema>) {
    this.realmService.updateObjectInRealm(SCHEMA_NAMES.POST, postData);
  }

  deletePost(postId: string) {
    this.realmService.deleteObjectFromRealm(SCHEMA_NAMES.POST, postId);
  }

  async getPosts(): Promise<Results<PostSchema>> {
    const data = this.realmService.fetchAllObjectsFromRealm(
      PostSchema.schema.name,
    );

    return data;
  }

  async getPost(): Promise<Results<PostSchema>> {
    const data = this.realmService.fetchObjectFromRealm(
      PostSchema.schema.name,
    );

    return data;
  }
}

export default PostService;
