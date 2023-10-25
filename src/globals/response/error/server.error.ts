import * as Error from "../error";

/**
 * @description Error class for server error
 */
class InternalServerError extends Error.Error.CustomError {
  constructor() {
    super("Internal Server Error", 500);
  }
}

export { InternalServerError };
