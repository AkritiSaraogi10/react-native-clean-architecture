import { Results } from "realm";

export interface RealmServiceInterface<T extends Realm.Object> {
    addObjectToRealm(schemaName: string, objectData: T): void;
    addObjectsToRealm(schemaName: string, objectsData: T[]): void;
    updateObjectInRealm(schemaName: string, objectData: Partial<T>): void;
    deleteObjectFromRealm(schemaName: string, objectId: string): void;
    fetchAllObjectsFromRealm(schemaName: string): Results<T>;
    deleteAllObjectsFromRealm(schemaName: string): void;
}