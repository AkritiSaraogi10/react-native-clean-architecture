export class ServerException implements Error {
  public name: string;
  public message: string;
  public statusCode?: number | null;
  public errorCode?: string | undefined;

  constructor(
    message: string,
    statusCode?: number | null,
    errorCode?: string | undefined,
  ) {
    this.name = 'ServerException';
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
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
