import { BSON, Results, UpdateMode } from "realm";
import { RealmServiceInterface } from "./realm_service_abstract";
import Realm from 'realm';

class RealmService<T extends Realm.Object> implements RealmServiceInterface<T> {
    private static instance: RealmService<any>;
    private realm!: Realm;
  
    private constructor(schema: Realm.ObjectSchema[]) {
      if (!RealmService.instance) {
        this.realm = new Realm({ schema });
        RealmService.instance = this;
      }
  
      return RealmService.instance;
    }
  
    static getInstance<T extends Realm.Object>(schema: Realm.ObjectSchema[]) {
      return this.instance || new RealmService<T>(schema);
    }
  
    addObjectToRealm(schemaName: string, objectData: T) {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData);
      });
    }
  
    addObjectsToRealm(schemaName: string, objectsData: T[]) {
      this.realm.write(() => {
        objectsData.forEach(objectData => {
          this.realm.create<T>(schemaName, objectData);
        });
      });
    }
  
    updateObjectInRealm(schemaName: string, objectData: Partial<T>) {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData, UpdateMode.Modified);
      });
    }
  
    deleteObjectFromRealm(schemaName: string, objectId: string) {
      const objectType = this.realm.objects<T>(schemaName);
      const objectToDelete = objectType.filtered('_id = $0', new BSON.ObjectId(objectId));
  
      this.realm.write(() => {
        this.realm.delete(objectToDelete);
      });
    }
  
    fetchAllObjectsFromRealm(schemaName:string): Results<T> {
      return this.realm.objects<T>(schemaName) as unknown as Results<T>;
    }
  
    deleteAllObjectsFromRealm() {
      this.realm.write(() => {
        this.realm.deleteAll();
      });
    }
  }
  
  export default RealmService;