import ApiResponse from '../../../../core/models/api_response';

export interface PostDataSource {
  getPosts(): Promise<ApiResponse<PostDto[]>>;
  getPost(): Promise<ApiResponse<PostDto>>;
}
