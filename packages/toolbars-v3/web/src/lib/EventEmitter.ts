export default class EventEmitter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private callbacks: { [key: string]: Function[] } = {};

  // eslint-disable-next-line @typescript-eslint/ban-types
  public on(event: string, fn: Function): this {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(fn);

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected emit(event: string, ...args: any): this {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach(callback => callback.apply(this, args));
    }

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public off(event: string, fn?: Function): this {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      if (fn) {
        this.callbacks[event] = callbacks.filter(callback => callback !== fn);
      } else {
        // eslint-disable-next-line fp/no-delete
        delete this.callbacks[event];
      }
    }

    return this;
  }

  protected removeAllListeners(): void {
    this.callbacks = {};
  }
}
