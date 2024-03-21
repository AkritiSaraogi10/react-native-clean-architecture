import {BSON} from 'realm';
import RealmService from '../../network/realm_service';
import {SCHEMA_NAMES} from '../../schema_names'; // Importing SCHEMA_NAMES constant
import {IPost} from '../../../../features/posts/domain/entities/post_entity';
import {CollectionChangeCallback} from 'realm'; // Importing CollectionChangeCallback type from Realm
import PostSchema from './post_schema';

// Class responsible for handling post-related operations
class PostService {
  private static instance: PostService; // Static instance of PostService
  private realmService: RealmService<PostSchema>; // Instance of RealmService for PostSchema

  private constructor() {
    // Initializing RealmService with PostSchema
    this.realmService = RealmService.getInstance<PostSchema>([
      PostSchema.schema,
    ]);
  }

  // Method to get a singleton instance of PostService
  static getInstance() {
    return this.instance || new PostService();
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
  updatePost(postData: Partial<PostSchema>) {
    this.realmService.updateObjectInRealm(SCHEMA_NAMES.POST, postData);
  }

  // Method to delete a post from the Realm database
  deletePost(postId: string) {
    this.realmService.deleteObjectFromRealm(SCHEMA_NAMES.POST, postId);
  }

  // Method to asynchronously retrieve posts from the Realm database
  async getPosts(
    listener: CollectionChangeCallback<PostSchema, [number, PostSchema]>,
  ): Promise<IPost[]> {
    // Fetching all posts from Realm database
    const data = this.realmService.fetchAllObjectsFromRealm(
      PostSchema.schema.name,
    );
    data.addListener(listener); // Adding listener to data changes
    const posts: IPost[] = [];
    return posts; // Returning posts as IPost entity (bcoz presentation layer expects IPost return type before storing to local state)
  }

  // Method to asynchronously retrieve posts from the Realm database
  async getPosts2(
    listener: CollectionChangeCallback<PostSchema, [number, PostSchema]>,
  ): Promise<IPost[]> {
    // Fetching all posts from Realm database
    const data = this.realmService.fetchAllObjectsFromRealm(
      PostSchema.schema.name,
    );
    data.addListener(listener); // Adding listener to data changes
    const posts: IPost[] = [];
    return posts; // Returning posts as IPost entity (bcoz presentation layer expects IPost return type before storing to local state)
  }
}

export default PostService; // Exporting PostService class as default
