import Realm from 'realm';
import PostSchema from '../collections/post/post_schema';

class Database {
  private realm: Realm;
  constructor() {
    this.realm = new Realm({schema: [PostSchema]});
  }

  public get realmInstance() {
    return this.realm;
  }
}

export default Database;
