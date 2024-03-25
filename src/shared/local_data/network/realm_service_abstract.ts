import {Results} from 'realm'; // Importing Results type from Realm library

// T defines the Schema class on which the operation will be performed. e.g (PostSchema in post_schema.ts)
// Schema name is always necessary to let realm know, whom to target

// Interface defining methods for interacting with a Realm database
export interface RealmServiceInterface<T extends Realm.Object> {
  // Method to add a single object to the Realm database
  addObjectToRealm(schemaName: string, objectData: T): void;

  // Method to add multiple objects to the Realm database
  addObjectsToRealm(schemaName: string, objectsData: T[]): void;

  // Method to update an object in the Realm database
  updateObjectInRealm(schemaName: string, objectData: Partial<T>): void;

  // Method to delete an object from the Realm database
  deleteObjectFromRealm(schemaName: string, objectId: string): void;

  // Method to fetch all objects of a given schema from the Realm database
  fetchAllObjectsFromRealm(schemaName: string): Results<T>;
}
