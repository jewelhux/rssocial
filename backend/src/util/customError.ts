export default class CustomError extends Error {
  constructor(public message: string = 'Internal error', public statusCode: number = 500) {
    super();
  }

  public response = () => {
    return { status: 'fail', message: this.message };
  };
}
