import {AxiosResponse} from 'axios';

export interface IAxiosOperations {
  get(path: string): Promise<AxiosResponse<any>>;
  delete(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
  patch(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
  post(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
  put(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
}
