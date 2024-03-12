import { useEffect } from 'react';
import { RealmContext } from '../realm_config';
import { SCHEMA_NAMES } from '../schema_names';
import UserSchema from './user_schema';
import Realm, { BSON, UpdateMode } from 'realm';

const { useRealm } = RealmContext;

class UserService {
  private static instance: UserService;
  private realm!: Realm;

  private constructor() {
    if (!UserService.instance) {
      UserService.instance = this;
      this.realm = new Realm({ schema: [UserSchema] });
    }

    return UserService.instance;
  }

  static getInstance() {
    return this.instance || new UserService();
  }

  addUserToRealm(userData: UserSchema) {
    this.realm.write(() => {
      this.realm.create<UserSchema>(SCHEMA_NAMES.USER, userData);
    });
  }

  addUsersToRealm(usersData: UserSchema[]) {
    this.realm.write(() => {
      usersData.forEach(userData => {
        this.realm.create<UserSchema>(SCHEMA_NAMES.USER, userData);
      });
    });
  }

  updateUserToRealm(userData: Partial<UserSchema>) {
    this.realm.write(() => {
      this.realm.create<UserSchema>(SCHEMA_NAMES.USER, userData, UpdateMode.Modified);
    });
  }

  deleteUserFromRealm(userId: string) {
    const userToDelete = this.realm.objects<UserSchema>(SCHEMA_NAMES.USER).filtered('_id = $0', new BSON.ObjectId(userId));
    
    this.realm.write(() => {
      this.realm.delete(userToDelete);
    });
  }

  fetchAllUsersFromRealm() {
    return this.realm.objects<UserSchema>(SCHEMA_NAMES.USER);
  }
}

export default UserService;
