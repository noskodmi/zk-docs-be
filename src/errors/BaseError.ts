export const CommonErrors = {
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND'
}

/**
 * Default JS Error requires a lot of boilerplate
 * @see https://stackoverflow.com/questions/42754270/re-throwing-exception-in-nodejs-and-not-losing-stack-trace
 */
export default class BaseError extends Error {
  readonly cause?: Error;
  readonly newStack: string;
  readonly name: string = this.constructor.name;
  readonly stack: string;

  constructor(message: string, cause?: Error) {
    super(message);
    this.message = message;
    this.cause = cause;
    this.stack ??= '';
    this.newStack = this.stack;
    if (cause) {
      const lines = (this.message.match(/\n/g) || []).length + 1;
      this.stack =
        this.newStack
          .split('\n')
          .slice(0, lines + 1)
          .join('\n') +
        '\n' +
        (cause.stack || '');
    }
  }
}
