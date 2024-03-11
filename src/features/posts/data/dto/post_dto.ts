import {IPost} from '../../domain/entities/post_entity';

class PostDto implements IPost {
  userId: string;
  id: string;
  title: string;
  body: string;

  constructor(userId: string, id: string, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  // Deserialize from JSON
  static fromJson(json: Record<string, any>): PostDto {
    return new PostDto(json.userId, json.id, json.title, json.body);
  }

  // Serialize to JSON
  toJson(): string {
    return JSON.stringify(this);
  }
}
export default PostDto;
