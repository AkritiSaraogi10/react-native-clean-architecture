import {BSON} from 'realm';

// Class representing a post DTO (Data Transfer Object)
class PostDto {
  userId: string;
  _id: BSON.UUID;
  title: string;
  body: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;

  // Constructor to initialize post properties
  constructor(
    userId: string,
    id: string,
    title: string,
    body: string,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.userId = userId?.toString() ?? '';
    this._id = new BSON.UUID(id);
    this.title = title;
    this.body = body;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Static method to deserialize from JSON
  static fromJson(json: Record<string, any>): PostDto {
    return new PostDto(
      json.userId,
      json.id,
      json.title,
      json.description,
      json.authorId,
      json.createdAt,
      json.updatedAt,
    );
  }

  // Method to serialize to JSON
  toJson(): string {
    return JSON.stringify(this);
  }
}

export default PostDto;
