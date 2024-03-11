import {AxiosResponse} from 'axios';
import ApiResponse from '../../../../core/models/api_response';
import {PostDataSource} from './post_data_source';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import PostDto from '../dto/post_dto';

class PostDataApiImpl implements PostDataSource {
  axiosOperations: AxiosOperations;

  constructor(axiosOperations: AxiosOperations) {
    this.axiosOperations = axiosOperations;
  }

  async getPosts(): Promise<ApiResponse<PostDto[]>> {
    try {
      const results: AxiosResponse<any> = await this.axiosOperations.get(
        'https://jsonplaceholder.typicode.com/posts',
      );

      return ApiResponse.fromJson<PostDto[], PostDto>(
        results.data,
        PostDto.fromJson,
        {isList: true},
      );
    } catch (e) {
      throw new ServerException((e as Error).toString(), null);
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
      throw new ServerException((e as Error).toString(), null);
    }
  }
}
export default PostDataApiImpl;
