import { AxiosResponse } from 'axios'; // Importing AxiosResponse type from Axios library

// Interface defining methods for Axios HTTP operations
export interface IAxiosOperations {
  // Method to perform a GET request
  get(path: string): Promise<AxiosResponse<any>>;
  
  // Method to perform a DELETE request
  delete(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
  
  // Method to perform a PATCH request
  patch(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
  
  // Method to perform a POST request
  post(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
  
  // Method to perform a PUT request
  put(path: string, body?: Record<string, any>): Promise<AxiosResponse<any>>;
}
