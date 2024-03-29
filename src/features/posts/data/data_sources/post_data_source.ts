import ApiResponse from '../../../../core/models/api_response';
import PostDto from '../dto/post_dto';

export interface PostDataSource {
  getPosts(): Promise<ApiResponse<PostDto[]>>;
  getPost(): Promise<ApiResponse<PostDto>>;
}
