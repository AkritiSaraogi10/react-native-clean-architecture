class PostDto {
  userId: number;
  id: number;
  title: string;
  body: string;

  constructor(userId: number, id: number, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  // Deserialize from JSON
  static fromJson(json: Record<string, any>): PostDto {
    return new PostDto(
      parseInt(json.userId),
      parseInt(json.id),
      json.title,
      json.body,
    );
  }

  // Serialize to JSON
  toJson(): string {
    return JSON.stringify(this);
  }
}
