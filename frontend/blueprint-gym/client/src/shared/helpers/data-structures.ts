class BaseQueue<T> {
  protected store: T[] = [];

  public count = () => this.store.length;
  public toList = () => [...this.store];
}

export class Queue<T> extends BaseQueue<T> {
  public push(val: T): void {
    this.store.push(val);
  }

  public pop(): T | undefined {
    return this.store.shift();
  }
}

export class UniqueQueue<T> extends BaseQueue<T> {
  private max: number | undefined;
  private storeSet = new Set<T>();

  constructor(max?: number) {
    super();
    if (max !== undefined) {
      this.max = max;
    }
  }

  public push(val: T): void {
    if (this.storeSet.has(val)) {
      this.store = this.store.filter((x) => x !== val);
    }
    this.store.push(val);
    this.storeSet.add(val);
    if (this.max && this.count() > this.max) {
      const removed = this.pop();
      if (removed) {
        this.storeSet.delete(removed);
      }
    }
  }

  public pop(): T | undefined {
    return this.store.shift();
  }

  public clear(): void {
    this.store = [];
    this.storeSet.clear();
  }
}
