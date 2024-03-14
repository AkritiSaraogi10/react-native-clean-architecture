import { BSON } from "realm";

export interface IPost {
  userId: string;
  _id: BSON.ObjectId;
  title: string;
  body: string;
}
