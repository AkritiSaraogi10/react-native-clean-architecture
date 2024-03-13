import { Results } from "realm";
import RealmService from "../../network/realm_service";
import UserSchema from "./user_schema";
import { SCHEMA_NAMES } from "../../schema_names";

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

  fetchAllUsersFromRealm(): Results<UserSchema> {
    return this.realmService.fetchAllObjectsFromRealm(UserSchema.schema.name);
  }

  deleteAllUsersFromRealm() {
    this.realmService.deleteAllObjectsFromRealm();
  }
}

export default UserService;
