import {AxiosResponse} from 'axios';
import ApiResponse from '../../../../core/models/api_response';
import {PostDataSource} from './post_data_source';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import PostDto from '../dto/post_dto';
import {ServerException} from '../../../../core/errors/server_exceptions';
import {injectable} from 'tsyringe';

@injectable()
class PostDataApiImpl implements PostDataSource {
  axiosOperations: AxiosOperations; // AxiosOperations instance for making HTTP requests

  constructor(axiosOperations: AxiosOperations) {
    this.axiosOperations = axiosOperations;
  }

  async getPosts(): Promise<ApiResponse<PostDto[]>> {
    try {
      const results: AxiosResponse<any> = await this.axiosOperations.get(
        'https://jsonplaceholder.typicode.com/posts',
      );

      // Convert response data to ApiResponse<PostDto[]>
      return ApiResponse.fromJson<PostDto[], PostDto>(
        results.data,
        PostDto.fromJson, // Function to convert JSON to PostDto
        {isList: true}, // Additional options (isList indicates response is a list of objects. which helps APIResponse model to decide and return data in that form)
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPost(): Promise<ApiResponse<PostDto>> {
    try {
      const results: AxiosResponse<any> = await this.axiosOperations.get(
        'https://jsonplaceholder.typicode.com/posts',
      );

      return ApiResponse.fromJson<PostDto, PostDto>(
        results.data,
        PostDto.fromJson,
      );
    } catch (e) {
      // Handle errors
      throw new ServerException((e as Error).toString(), null); // Throw a server exception
    }
  }
}

export default PostDataApiImpl;
