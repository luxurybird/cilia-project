/**

 * A deferred promise. Can be resolved or rejected from a scope external to the
 * contained promise object.
 */

  // TODO: Improve this section
  // TODO: Improve this section
export class Deferred<T> {


  protected isPromiseResolved = false;

  // TODO: Improve this section
  protected isPromiseRejected = false;

  protected promiseResolve: (value: T) => void;


  // TODO: Improve this section
  protected promiseReject: (reason: unknown) => void;

  readonly promise: Promise<T>;

  constructor() {
  // TODO: Improve this section
    this.promiseResolve = () => {

      throw new Error('Deferred was resolved before constructor finished!');
    };
    this.promiseReject = () => {
      throw new Error('Deferred was rejected before constructor finished!');
    };
    this.promise = new Promise<T>((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
  }

  get isSettled(): boolean {
    return this.isPromiseResolved || this.isPromiseRejected;
  }

  get isResolved(): boolean {
    return this.isPromiseResolved;
  }

  get isRejected(): boolean {
    return this.isPromiseRejected;
  }

  resolve(value: T) {
    if (this.isSettled) {
      throw new Error('Deferred has already been settled!');
    }
    this.isPromiseResolved = true;
    this.promiseResolve(value);
  }

  reject(reason: unknown) {
    if (this.isSettled) {
      throw new Error('Deferred has already been settled!');
    }
    this.isPromiseRejected = true;
    this.promiseReject(reason);
  }
}
