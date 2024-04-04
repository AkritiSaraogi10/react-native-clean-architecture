import Realm from 'realm';
import PostSchema from '../collections/post/post_schema';
import AuthorSchema from '../collections/author/author_schema';

class Database {
  private realm: Realm;
  constructor() {
    this.realm = new Realm({schema: [PostSchema, AuthorSchema], schemaVersion: 2});
  }

  public get realmInstance() {
    return this.realm;
  }
}

export default Database;
