import ApiResponse from '../../../../core/models/api_response'; // Importing ApiResponse model
import PostDto from '../dto/post_dto'; // Importing PostDto class

// Interface for the data source responsible for retrieving post data API response from global core API response model
export interface PostDataSource {
  getPosts(): Promise<ApiResponse<PostDto[]>>;
  getPost(): Promise<ApiResponse<PostDto>>;
}
