// Make sure Feature Schema and API response (DTO file) keys and types should be same. To avoid issues during local realm and remote DB sync

// Importing necessary modules and dependencies
import {BSON, ObjectSchema} from 'realm'; // Importing BSON and ObjectSchema from Realm
import {SCHEMA_NAMES} from '../../schema_names'; // Importing SCHEMA_NAMES constant
import {Realm} from 'realm'; // Importing Realm class from Realm library

// Class definition for PostSchema representing a Realm object. (same as of API response)
class PostSchema extends Realm.Object {
  _id!: BSON.ObjectId;
  title!: string;
  userId!: string;
  body!: string;

  // Static schema definition for the PostSchema
  static schema: ObjectSchema = {
    name: SCHEMA_NAMES.POST, // Name of the schema obtained from SCHEMA_NAMES constant
    primaryKey: '_id', // Primary key of the schema
    properties: {
      _id: 'objectId',
      title: 'string',
      userId: 'string',
      body: 'string',
    },
  };
  [key: string]: unknown;
}

export default PostSchema;
