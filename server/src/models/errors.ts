export class DuplicateKeyError extends Error {
  public message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class BadRequestError extends Error {
  public message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
