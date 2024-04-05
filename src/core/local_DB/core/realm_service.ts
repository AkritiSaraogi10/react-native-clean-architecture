import {BSON, Results, UpdateMode} from 'realm';
import {RealmServiceInterface} from './realm_service_abstract';
import Realm from 'realm';
import {injectable, singleton} from 'tsyringe';
import Database from './Database';
import {ServerException} from '../../errors/server_exceptions';
import {SCHEMA_NAMES, prefsKeys} from '../../utils/constants/constants';
import AxiosOperations from '../../network/axios/axios_operations';
import AsyncStorage from '@react-native-async-storage/async-storage';

@singleton()
@injectable()
class RealmService<T extends Realm.Object> implements RealmServiceInterface<T> {
  private realm!: Realm;
  private axios: AxiosOperations;

  constructor(realmDb: Database, axios: AxiosOperations) {
    this.realm = realmDb.realmInstance;
    this.axios = axios;
  }
  public get realmInstance() {
    return this.realm;
  }

  addObjectToRealm(schemaName: string, objectData: T) {
    try {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData, UpdateMode.Modified);
      });
    } catch (e) {
      console.log('realm ------------..........', e);
      throw new ServerException(
        `Unable to add ${schemaName} to offline DB ${e}`,
      );
    }
  }

  addObjectsToRealm(schemaName: string, objectsData: T[]) {
    try {
      this.realm.write(() => {
        objectsData.forEach(objectData => {
          this.realm.create<T>(schemaName, objectData, UpdateMode.Modified);
        });
      });
    } catch (e) {
      console.log('realm 44------------..........', e);
      throw new ServerException(
        `Unable to add ${schemaName} to offline DB ${e}`,
      );
    }
  }

  updateObjectInRealm(schemaName: string, objectData: Partial<T>) {
    try {
      this.realm.write(() => {
        this.realm.create<T>(schemaName, objectData, UpdateMode.Modified);
      });
    } catch (e) {
      throw new ServerException(
        `Unable to update ${schemaName} to offline DB ${e}`,
      );
    }
  }

  deleteObjectFromRealm(schemaName: string, objectId: string) {
    const objectType = this.realm.objects<T>(schemaName);
    const objectToDelete = objectType.filtered(
      '_id = $0',
      new BSON.UUID(objectId),
    );

    try {
      this.realm.write(() => {
        this.realm.delete(objectToDelete);
      });
    } catch (e) {
      throw new ServerException(
        `Unable to delete ${schemaName} from offline DB ${e}`,
      );
    }
  }

  fetchAllObjectsFromRealm(schemaName: string): Results<T> {
    try {
      const posts = this.realm.objects<T>(schemaName) as unknown as Results<T>;
      return posts;
    } catch (e) {
      throw new ServerException(
        `Unable to fetch ${schemaName} from offline DB ${e}`,
      );
    }
  }

  fetchObjectFromRealm(schemaName: string): Results<T> {
    try {
      const posts = this.realm.objects<T>(schemaName) as unknown as Results<T>;
      return posts;
    } catch (e) {
      throw new ServerException(
        `Unable to fetch ${schemaName} from offline DB ${e}`,
      );
    }
  }

  serverDataSync = async () => {
    let body: {[key: string]: any[]} = {};
    try {
      let last_sync_date = await AsyncStorage.getItem(prefsKeys.SYNC_TIME);
      console.log({last_sync_date});

      for (let schemaName of Object.values(SCHEMA_NAMES)) {
        const data = this.realm.objects<T>(
          schemaName,
        ) as unknown as Results<any>;

        const changedData = data.filter(v => {
          return !last_sync_date
            ? true
            : new Date(v.createdAt) > new Date(last_sync_date) ||
                new Date(v.updatedAt) > new Date(last_sync_date);
        });
        body[schemaName] = changedData;
      }
      console.log('SYNC BODY:  ', body);
      //Axios post call
      await this.axios.post('http://10.0.2.2:4000/local-to-remote', {
        last_sync_date,
        incoming_data_from_client: body,
      });
    } catch (e) {
      console.log(e);
    }
    await AsyncStorage.setItem(prefsKeys.SYNC_TIME, new Date().toISOString());
  };
}

export default RealmService;
