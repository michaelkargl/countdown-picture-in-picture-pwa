export class RandomUtils {
  public static getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  public static getRandomInt(min = 0, max = 2**32-1): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getRandomElement<T>(collection: IterableIterator<T> | T[]): T {
    if(!Array.isArray(collection)) {
      collection = Array.from(collection);
    }

    const index = this.getRandomInt(0, collection.length-1);
    return collection[index];
  }
}
