import axios, {AxiosResponse} from 'axios';
import {IAxiosOperations} from './axios_operations_abstract';
import {ServerException} from '../../errors/server_exceptions';
import store from '../../../shared/presentation/redux/store';
import {injectable, singleton} from 'tsyringe';

@singleton()
@injectable()
class AxiosOperations implements IAxiosOperations {
  private axiosInstance: typeof axios;
  constructor() {
    this.axiosInstance = axios;
  }

  private async _handleRequest<T>(
    requestFunction: () => Promise<AxiosResponse<T>>,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await requestFunction();
      if (response.status >= 200 && response.status < 300) {
        // Successful response, you can handle it accordingly
        return response;
      } else if (response.status === 400) {
        // Handle 400 Bad Request
        // You can customize this based on your needs
        throw new ServerException('Bad Request', response.status);
      } else if (response.status === 401) {
        // Handle 401 Unauthorized
        // You can customize this based on your needs
        throw new ServerException('Unauthorized', response.status);
      } else if (response.status === 404) {
        // Handle 404 Not Found
        // You can customize this based on your needs
        throw new ServerException('Not Found', response.status);
      } else {
        // Handle other status codes
        throw new ServerException('Unknown Error', response.status);
      }
    } catch (error) {
      if (error instanceof ServerException) {
        // If it's a custom exception, rethrow it
        throw error;
      } else {
        // If it's another type of error, convert it to a ServerException
        throw new ServerException((error as Error).toString(), null);
      }
    }
  }

  async get(path: string): Promise<AxiosResponse<any>> {
    return this._handleRequest(() => this.axiosInstance.get(path));
  }

  async delete(
    path: string,
    body?: Record<string, any>,
  ): Promise<AxiosResponse<any>> {
    return this._handleRequest(() =>
      this.axiosInstance.delete(path, {data: body}),
    );
  }

  async patch(
    path: string,
    body?: Record<string, any>,
  ): Promise<AxiosResponse<any>> {
    return this._handleRequest(() => this.axiosInstance.patch(path, body));
  }

  async post(
    path: string,
    body?: Record<string, any>,
  ): Promise<AxiosResponse<any>> {
    return this._handleRequest(() => this.axiosInstance.post(path, body));
  }

  async put(
    path: string,
    body?: Record<string, any>,
  ): Promise<AxiosResponse<any>> {
    return this._handleRequest(() => this.axiosInstance.put(path, body));
  }
}

export default AxiosOperations;
