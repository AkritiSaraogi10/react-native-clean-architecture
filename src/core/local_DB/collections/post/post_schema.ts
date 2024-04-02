import {BSON, ObjectSchema} from 'realm';
import {Realm} from 'realm';
import {container, delay} from 'tsyringe';
import Database from '../../core/Database'; // this causes cyclic import will be fixed later
import { SCHEMA_NAMES } from '../../../utils/constants/constants';

// Class definition for PostSchema representing a Realm object. (same as of API response)
class PostSchema extends Realm.Object {
  _id!: BSON.ObjectId;
  title!: string;
  userId!: string;
  body!: string;
  private static _realm: Realm;

  // Static schema definition for the PostSchema
  static schema: ObjectSchema = {
    name: SCHEMA_NAMES.POST,
    primaryKey: '_id', // Primary key of the schema
    properties: {
      _id: 'objectId',
      title: 'string',
      userId: 'string',
      body: 'string',
    },
  };
  /**
   *
   */

  static fromJSON(json: Record<string, any>): PostSchema {
    if (!this._realm) {
      const realmDb = container.resolve(delay(() => Database));
      this._realm = realmDb.realmInstance;
    }

    // type casting as instantiating will create a record in db
    const obj: PostSchema = {
      _id: new BSON.ObjectId(json._id), // must remove instantiation after proper db and api
      title: json.title,
      userId: json.userId,
      body: json.body,
    } as PostSchema;

    return obj;
  }
}

export default PostSchema;
