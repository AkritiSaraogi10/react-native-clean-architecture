import {Results} from 'realm';
import RealmService from '../../network/realm_service';
import {SCHEMA_NAMES} from '../../schema_names';
import {IPost} from '../../../../features/posts/domain/entities/post_entity';
import PostSchema from './post_schema';
import {injectable} from 'tsyringe';

// Class responsible for handling post-related
@injectable()
class PostService {
  private static instance: PostService; // Static instance of PostService
  private realmService: RealmService<PostSchema>; // Instance of RealmService for PostSchema

  constructor(realmService: RealmService<PostSchema>) {
    this.realmService = realmService;
  }

  // Method to add a post to the Realm database
  addPost(postData: PostSchema) {
    this.realmService.addObjectToRealm(SCHEMA_NAMES.POST, postData);
  }

  // Method to add multiple posts to the Realm database
  addPosts(postData: PostSchema[]) {
    this.realmService.addObjectsToRealm(SCHEMA_NAMES.POST, postData);
  }

  // Method to update a post in the Realm database
  updatePost(postData: Partial<IPost>) {
    this.realmService.updateObjectInRealm(SCHEMA_NAMES.POST, postData);
  }

  // Method to delete a post from the Realm database
  deletePost(postId: string) {
    this.realmService.deleteObjectFromRealm(SCHEMA_NAMES.POST, postId);
  }

  // Method to asynchronously retrieve posts from the Realm database
  async getPosts(): Promise<Results<PostSchema>> {
    // Fetching all posts from Realm database
    const data = this.realmService.fetchAllObjectsFromRealm(
      PostSchema.schema.name,
    );

    return data; // Returning posts as IPost entity (bcoz presentation layer expects IPost return type before storing to local state)
  }
}

export default PostService; // Exporting PostService class as default
