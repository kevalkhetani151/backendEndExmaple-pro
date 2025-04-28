export class customeError extends Error {
  public statusCode: number;
  public errorCode?: string;
  public timestamp: Date;

  constructor(message: string, statuscode: number, errorcode?: string) {
    super(message);
    this.statusCode = statuscode;
    this.errorCode = errorcode;
    this.timestamp = new Date();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
