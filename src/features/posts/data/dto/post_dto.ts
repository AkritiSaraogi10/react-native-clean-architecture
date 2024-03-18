import { BSON } from 'realm'; // Importing BSON from Realm
import { IPost } from '../../domain/entities/post_entity'; // Importing IPost interface from domain layer

// Class representing a post DTO (Data Transfer Object)
class PostDto implements IPost {
  userId: string; // User ID
  _id: BSON.ObjectId; // Post ID
  title: string; // Post title
  body: string; // Post body

  // Constructor to initialize post properties
  constructor(userId: string, id: number, title: string, body: string) {
    this.userId = userId?.toString() ?? '';
    this._id = new BSON.ObjectId(id);
    this.title = title;
    this.body = body;
  }

  // Static method to deserialize from JSON
  static fromJson(json: Record<string, any>): PostDto {
    return new PostDto(json.userId, json._id, json.title, json.body);
  }

  // Method to serialize to JSON
  toJson(): string {
    return JSON.stringify(this);
  }
}

export default PostDto;