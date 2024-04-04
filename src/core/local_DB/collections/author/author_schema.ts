import {BSON, ObjectSchema} from 'realm';
import {Realm} from 'realm';
import {container, delay} from 'tsyringe';
import Database from '../../core/Database';
import { SCHEMA_NAMES } from '../../../utils/constants/constants';

class AuthorSchema extends Realm.Object {
  _id!: BSON.UUID;
  name!: string;
  age!: string;
  private static _realm: Realm;

  // Static schema definition for the PostSchema
  static schema: ObjectSchema = {
    name: SCHEMA_NAMES.AUTHOR,
    primaryKey: '_id', // Primary key of the schema
    properties: {
      _id: 'uuid',
      name: 'string',
      age: 'string'
    },
  };
  /**
   *
   */

  static fromJSON(json: Record<string, any>): AuthorSchema {
    if (!this._realm) {
      const realmDb = container.resolve(delay(() => Database));
      this._realm = realmDb.realmInstance;
    }

    // type casting as instantiating will create a record in db
    const obj: AuthorSchema = {
      _id: new BSON.UUID(json._id), // must remove instantiation after proper db and api
      name: json.name,
      age: json.age
    } as AuthorSchema;

    return obj;
  }
}

export default AuthorSchema;
