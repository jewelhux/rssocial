export default class CustomError extends Error {
  constructor(
    public errorMessage: string | string[] = 'Internal error',
    public statusCode: number = 500
  ) {
    super();
  }

  public response = () => {
    return { status: 'fail', message: this.errorMessage };
  };
}

interface CodeError extends Error {
  code: number;
}

export function hasCode(e: unknown): e is CodeError {
  return typeof (e as CodeError)?.code === 'number';
}
