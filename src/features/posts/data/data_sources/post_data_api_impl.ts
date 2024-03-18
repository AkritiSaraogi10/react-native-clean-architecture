import { AxiosResponse } from 'axios'; // Importing AxiosResponse from Axios
import ApiResponse from '../../../../core/models/api_response'; // Importing ApiResponse model
import { PostDataSource } from './post_data_source'; // Importing PostDataSource interface
import AxiosOperations from '../../../../core/network/axios/axios_operations'; // Importing AxiosOperations class
import PostDto from '../dto/post_dto'; // Importing PostDto class

// Implementation of PostDataSource interface to retrieve post data from an API
class PostDataApiImpl implements PostDataSource {
  axiosOperations: AxiosOperations; // AxiosOperations instance for making HTTP requests

  // Constructor to initialize AxiosOperations instance
  constructor(axiosOperations: AxiosOperations) {
    this.axiosOperations = axiosOperations;
  }

  // Method to retrieve multiple posts from the API
  async getPosts(): Promise<ApiResponse<PostDto[]>> {
    try {
      const results: AxiosResponse<any> = await this.axiosOperations.get(
        'https://jsonplaceholder.typicode.com/posts', // Providing API endpoint for getting posts
      );

      // Convert response data to ApiResponse<PostDto[]>
      return ApiResponse.fromJson<PostDto[], PostDto>(
        results.data, // Response data
        PostDto.fromJson, // Function to convert JSON to PostDto
        { isList: true }, // Additional options (isList indicates response is a list of objects. which helps APIResponse model to decide and return data in that form)
      );
    } catch (e) {
      // Handle errors
      throw new ServerException((e as Error).toString(), null); // Throw a server exception
    }
  }

  // Method to retrieve a single post from the API
  async getPost(): Promise<ApiResponse<PostDto>> {
    try {
      const results: AxiosResponse<any> = await this.axiosOperations.get(
        'https://jsonplaceholder.typicode.com/posts', // API endpoint for getting posts
      );

      // Convert response data to ApiResponse<PostDto>
      return ApiResponse.fromJson<PostDto, PostDto>(
        results.data, // Response data
        PostDto.fromJson, // Function to convert JSON to PostDto
      );
    } catch (e) {
      // Handle errors
      throw new ServerException((e as Error).toString(), null); // Throw a server exception
    }
  }
}

export default PostDataApiImpl;
