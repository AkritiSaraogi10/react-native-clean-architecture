export class ServerException implements Error {
  public name: string;
  public message: string;
  public statusCode?: number | null;

  constructor(message: string, statusCode?: number | null) {
    this.name = 'ServerException';
    this.message = message;
    this.statusCode = statusCode;
  }
}
export class CancelTokenException implements Error {
  public name: string;
  public message: string;
  public statusCode?: number | null;

  constructor(message: string, statusCode?: number | null) {
    this.name = 'CancelTokenException';
    this.message = message;
    this.statusCode = statusCode;
  }
}
