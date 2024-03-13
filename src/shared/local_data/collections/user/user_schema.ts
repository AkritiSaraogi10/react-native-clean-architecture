import { BSON, ObjectSchema } from 'realm';
import { SCHEMA_NAMES } from '../../schema_names';
import { Realm } from 'realm';

class UserSchema extends Realm.Object {
  _id!: BSON.ObjectId;
  title!: string;
  userId!: string;
  body!: string;

  static schema: ObjectSchema = {
    name: SCHEMA_NAMES.USER,
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      userId: 'string',
      body: 'string',
    },
  };
  [key: string]: unknown;
}

export default UserSchema;
