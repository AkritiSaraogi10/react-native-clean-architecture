import {BSON, Results, UpdateMode} from 'realm';
import {RealmServiceInterface} from './realm_service_abstract';
import Realm from 'realm';
import {injectable, singleton} from 'tsyringe';
import Database from './Database';
import { ServerException } from '../../errors/server_exceptions';

@singleton()
@injectable()
class RealmService<T extends Realm.Object> implements RealmServiceInterface<T> {
  private realm!: Realm;

  constructor(realmDb: Database) {
    this.realm = realmDb.realmInstance;
  }
  public get realmInstance() {
    return this.realm;
  }

  addObjectToRealm(schemaName: string, objectData: T) {
    try {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData);
      });
    } catch (e) {
      throw new ServerException(`Unable to add ${schemaName} to offline DB`)
    }
  }

  addObjectsToRealm(schemaName: string, objectsData: T[]) {
    try {
      this.realm.write(() => {
        objectsData.forEach(objectData => {
          this.realm.create<T>(schemaName, objectData);
        });
      });
    } catch (e) {
      throw new ServerException(`Unable to add ${schemaName} to offline DB`)
    }
  }

  updateObjectInRealm(schemaName: string, objectData: Partial<T>) {
    try {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData, UpdateMode.Modified);
      });
    } catch (e) {
      throw new ServerException(`Unable to update ${schemaName} to offline DB`)
    }
  }

  deleteObjectFromRealm(schemaName: string, objectId: string) {
    const objectType = this.realm.objects<T>(schemaName);
    const objectToDelete = objectType.filtered(
      '_id = $0',
      new BSON.ObjectId(objectId),
    );

    try {
      this.realm.write(() => {
        this.realm.delete(objectToDelete);
      });
    } catch (e) {
      throw new ServerException(`Unable to delete ${schemaName} from offline DB`)
    } 
  }

  fetchAllObjectsFromRealm(schemaName: string): Results<T> {
    try {
      const posts = this.realm.objects<T>(schemaName) as unknown as Results<T>;
      return posts;
    } catch (e) {
      throw new ServerException(`Unable to fetch ${schemaName} from offline DB`)
    }
  }

  fetchObjectFromRealm(schemaName: string): Results<T> {
    try {
      const posts = this.realm.objects<T>(schemaName) as unknown as Results<T>;
      return posts;
    } catch (e) {
      throw new ServerException(`Unable to fetch ${schemaName} from offline DB`)
    }
  }
}

export default RealmService;
