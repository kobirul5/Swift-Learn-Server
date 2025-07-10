class ApiError extends Error {
  statusCode: number;
  data: null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any[];

  constructor(
    statusCode: number,
    message = "Something Went Wrong",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[] = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


export {ApiError}