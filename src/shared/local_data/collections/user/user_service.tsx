import { BSON, Results } from "realm";
import RealmService from "../../network/realm_service";
import UserSchema from "./user_schema";
import { SCHEMA_NAMES } from "../../schema_names";
import { IPost } from "../../../../features/posts/domain/entities/post_entity";
import { CollectionChangeCallback } from "realm";

class UserService {
  private static instance: UserService;
  private realmService: RealmService<UserSchema>;

  private constructor() {
    this.realmService = RealmService.getInstance<UserSchema>([UserSchema.schema]);
  }

  static getInstance() {
    return this.instance || new UserService();
  }

  addUserToRealm(userData: UserSchema) {
    this.realmService.addObjectToRealm(SCHEMA_NAMES.USER, userData);
  }

  addUsersToRealm(usersData: UserSchema[]) {
    this.realmService.addObjectsToRealm(SCHEMA_NAMES.USER, usersData);
  }

  updateUserToRealm(userData: Partial<UserSchema>) {
    this.realmService.updateObjectInRealm(SCHEMA_NAMES.USER, userData);
  }

  deleteUserFromRealm(userId: string) {
    this.realmService.deleteObjectFromRealm(SCHEMA_NAMES.USER, userId);
  }

  async getPosts(listener: CollectionChangeCallback<UserSchema, [number, UserSchema]> ): Promise<IPost[]> {
    const data = this.realmService.fetchAllObjectsFromRealm(UserSchema.schema.name);
    data.addListener(listener);
    const posts: IPost[] = data.map((item: any) => {
      return {
          userId: item.userId,
          _id: new BSON.ObjectId(item._id),
          title: item.title,
          body: item.body
      };
    });

    return posts;
  }

  deleteAllUsersFromRealm() {
    this.realmService.deleteAllObjectsFromRealm();
  }
}

export default UserService;
