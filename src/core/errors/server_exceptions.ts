class ServerException implements Error {
  public name: string = 'ServerException';
  constructor(public message: string, public statusCode: number | null) {}
}

class CancelTokenException implements Error {
  public name: string = 'CancelTokenException';
  constructor(public message: string, public statusCode: number | null) {}
}
