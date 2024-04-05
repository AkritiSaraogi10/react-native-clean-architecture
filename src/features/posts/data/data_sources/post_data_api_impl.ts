import {AxiosResponse} from 'axios';
import ApiResponse from '../../../../core/models/api_response';
import {PostDataSource} from './post_data_source';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import PostDto from '../dto/post_dto';
import {ServerException} from '../../../../core/errors/server_exceptions';
import {injectable} from 'tsyringe';
import PostSchema from '../../../../core/local_DB/collections/post/post_schema';

@injectable()
class PostDataApiImpl implements PostDataSource {
  axiosOperations: AxiosOperations; // AxiosOperations instance for making HTTP requests

  constructor(axiosOperations: AxiosOperations) {
    this.axiosOperations = axiosOperations;
  }
  async addPost(p: PostSchema): Promise<ApiResponse<PostDto>> {
    try {
      const res = await this.axiosOperations.post(
        'http://10.0.2.2:4000/add-post',
        {
          post: p,
        },
      );
      return ApiResponse.fromJson<PostDto, PostDto>(
        res.data.posts,
        PostDto.fromJson,
        {isList: false},
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updatePost(p: PostSchema): Promise<ApiResponse<PostDto>> {
    try {
      const res = await this.axiosOperations.put(
        `http://10.0.2.2:4000/update-post/${p._id}`,
        {
          post: p,
        },
      );
      return ApiResponse.fromJson<PostDto, PostDto>(
        res.data,
        PostDto.fromJson,
        {isList: false},
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deletePost(id: string): Promise<ApiResponse<PostDto>> {
    try {
      const res = await this.axiosOperations.delete(`http://10.0.2.2:4000/delete-post/${id}`);
      return ApiResponse.fromJson<PostDto, PostDto>(
        res.data,
        PostDto.fromJson,
        {isList: false},
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getPosts(): Promise<ApiResponse<PostDto[]>> {
    try {
      const results: AxiosResponse<any> = await this.axiosOperations.get(
        'http://10.0.2.2:4000/get-posts',
      );
      //   console.log(results.data.posts);
      // Convert response data to ApiResponse<PostDto[]>
      return ApiResponse.fromJson<PostDto[], PostDto>(
        results.data.posts,
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
