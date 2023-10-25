interface JSONResponse<T = string> {
  success: boolean;
  status: number;
  message: T;
}

export { JSONResponse };
