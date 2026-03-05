class ApiError extends Error {
  statusCode: number;
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any[];

  constructor(
    statusCode: number,
    message = "Something Went Wrong",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[] = [],
    data: any = null,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = data;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


export { ApiError }