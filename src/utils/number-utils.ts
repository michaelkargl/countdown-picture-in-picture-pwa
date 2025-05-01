
export function pad(num: number, size: number): string {
  let numberString = num.toString();

  while (numberString.length < size) {
    numberString = `0${numberString}`;
  }

  return numberString;
}

export class NumberUtils {
  public static pad(num: number, size: number): string {
    let numberString = num.toString();

    while (numberString.length < size) {
      numberString = `0${numberString}`;
    }

    return numberString;
  }

  public static isNumber(str: unknown): str is number {
    if(typeof str === 'number') {
      return true;
    }
    if (typeof str !== 'string') {
      return false;
    }
    return !isNaN(parseInt(str)) || !isNaN(parseFloat(str));
  }
}