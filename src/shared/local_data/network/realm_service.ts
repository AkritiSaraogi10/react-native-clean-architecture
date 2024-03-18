import { BSON, Results, UpdateMode } from "realm";
import { RealmServiceInterface } from "./realm_service_abstract";
import Realm from 'realm';

// Class implementing the RealmServiceInterface for interacting with a Realm database
class RealmService<T extends Realm.Object> implements RealmServiceInterface<T> {
    private static instance: RealmService<any>; // Static instance of RealmService
    private realm!: Realm; // Realm instance
  
    private constructor(schema: Realm.ObjectSchema[]) {
      // Ensure only one instance of RealmService is created
      if (!RealmService.instance) {
        this.realm = new Realm({ schema }); // Creating a new Realm instance with provided schema
        RealmService.instance = this; // Assigning the instance to static variable
      }
  
      return RealmService.instance; // Returning the instance
    }
  
    // Static method to get a singleton instance of RealmService
    static getInstance<T extends Realm.Object>(schema: Realm.ObjectSchema[]) {
      return this.instance || new RealmService<T>(schema); // Returning existing instance or creating a new one
    }
  
    // Method to add a single object to the Realm database
    addObjectToRealm(schemaName: string, objectData: T) {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData); // Creating a new object in the Realm database
      });
    }
  
    // Method to add multiple objects to the Realm database
    addObjectsToRealm(schemaName: string, objectsData: T[]) {
      this.realm.write(() => {
        objectsData.forEach(objectData => {
          this.realm.create<T>(schemaName, objectData); // Creating each object in the Realm database
        });
      });
    }
  
    // Method to update an object in the Realm database
    updateObjectInRealm(schemaName: string, objectData: Partial<T>) {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData, UpdateMode.Modified); // Updating the object in the Realm database
      });
    }
  
    // Method to delete an object from the Realm database
    deleteObjectFromRealm(schemaName: string, objectId: string) {
      const objectType = this.realm.objects<T>(schemaName); // Getting the object type
      const objectToDelete = objectType.filtered('_id = $0', new BSON.ObjectId(objectId)); // Filtering the object to delete based to objectId provided
  
      this.realm.write(() => {
        this.realm.delete(objectToDelete); // Deleting the object from the Realm database
      });
    }
  
    // Method to fetch all objects of a given schema from the Realm database
    fetchAllObjectsFromRealm(schemaName:string): Results<T> {
      return this.realm.objects<T>(schemaName) as unknown as Results<T>; // Fetching all objects from the Realm database
    }
}

export default RealmService;
