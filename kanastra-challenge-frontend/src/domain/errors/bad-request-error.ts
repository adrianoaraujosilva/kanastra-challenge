export class BadRequestError extends Error {
  constructor(message = 'A bad request was found') {
    super(message);
    this.name = BadRequestError.name;
  }
}
