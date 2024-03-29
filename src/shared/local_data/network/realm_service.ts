import {BSON, Results, UpdateMode} from 'realm';
import {RealmServiceInterface} from './realm_service_abstract';
import Realm from 'realm';
import {injectable, singleton} from 'tsyringe';
import Database from './Database';

@singleton()
@injectable()
class RealmService<T extends Realm.Object> implements RealmServiceInterface<T> {
  private static instance: RealmService<any>; // Static instance of RealmService
  private realm!: Realm; // Realm instance

  constructor(realmDb: Database) {
    this.realm = realmDb.realmInstance; // Creating a new Realm instance with provided schema
  }
  public get realmInstance() {
    return this.realm;
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
    const objectToDelete = objectType.filtered(
      '_id = $0',
      new BSON.ObjectId(objectId),
    ); // Filtering the object to delete based to objectId provided

    this.realm.write(() => {
      this.realm.delete(objectToDelete); // Deleting the object from the Realm database
    });
  }

  // Method to fetch all objects of a given schema from the Realm database
  fetchAllObjectsFromRealm(schemaName: string): Results<T> {
    return this.realm.objects<T>(schemaName) as unknown as Results<T>; // Fetching all objects from the Realm database
  }
}

export default RealmService;
