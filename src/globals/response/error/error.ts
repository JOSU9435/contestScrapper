import * as Interfaces from "../../interfaces";

/**
 * @description Custom Error class for Error handling
 */
class CustomError<T = string>
  implements Interfaces.JSONResponse.JSONResponse<T>
{
  public success: boolean;
  public status: number;
  public message: T;

  constructor(message: T, status?: number) {
    this.message = message;
    this.status = status ?? 400;
    this.success = false;
  }
}

export { CustomError };
