import {BSON} from 'realm';

// Class representing a post DTO (Data Transfer Object)
class PostDto {
  userId: string;
  _id: BSON.UUID;
  title: string;
  body: string;

  // Constructor to initialize post properties
  constructor(userId: string, id: number, title: string, body: string) {
    this.userId = userId?.toString() ?? '';
    this._id = new BSON.UUID(id?.toString());
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
