import {BSON, ObjectSchema} from 'realm';
import {Realm} from 'realm';
import {container, delay} from 'tsyringe';
import Database from '../../core/Database'; // this causes cyclic import will be fixed later
import { SCHEMA_NAMES } from '../../../utils/constants/constants';

// Class definition for PostSchema representing a Realm object. (same as of API response)
class PostSchema extends Realm.Object {
  _id!: BSON.UUID;
  title!: string;
  userId!: string;
  body!: string;
  createdAt!: Date;  //name, age , id for author schema
  updatedAt!: Date;
  authorId!: string
  private static _realm: Realm;

  // Static schema definition for the PostSchema
  static schema: ObjectSchema = {
    name: SCHEMA_NAMES.POST,
    primaryKey: '_id', // Primary key of the schema
    properties: {
      _id: 'uuid',
      title: 'string',
      userId: 'string',
      body: 'string',
      createdAt: 'date',
      updatedAt: 'date',
      authorId: 'string'
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
      _id: new BSON.UUID(json._id), // must remove instantiation after proper db and api
      title: json.title,
      userId: json.userId,
      body: json.body,
      createdAt: json.createdAt ?? new Date().toISOString(),
      updatedAt: json.updatedAt ?? new Date().toISOString(),
      authorId: json.authorId
    } as PostSchema;

    return obj;
  }
}

export default PostSchema;
