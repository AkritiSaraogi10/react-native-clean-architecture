class ApiResponse<T> {
  status: string;
  message: string;
  results: T;

  constructor({
    status,
    message,
    results,
  }: {
    status: string;
    message: string;
    results: T;
  }) {
    this.status = status;
    this.message = message;
    this.results = results;
  }

  static fromJson<T, P>(
    json: Record<string, any>,
    tFromJson: (data: Record<string, any>) => P,
    {isList = true}: {isList?: boolean} = {},
  ): ApiResponse<T> {
    const resultData = isList
      ? ((json as Record<string, any>[]).map(
          data => tFromJson(data) as P,
        ) as unknown as T)
      : (tFromJson(json as Record<string, any>) as unknown as T);

    return new ApiResponse<T>({
      status: json['status'],
      message: json['message'],
      results: resultData,
    });
  }
}

export default ApiResponse;
