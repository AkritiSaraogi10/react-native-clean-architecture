import { BSON } from "realm";

// IPost interface expecting to be used as per business logic on presentation layer
export interface IPost {
  userId: string;
  _id: BSON.ObjectId;
  title: string;
  body: string;
}
