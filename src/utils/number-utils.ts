
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

  public static isNumber(str: string): str is number {
    if (typeof str != 'string') {
      return false;
    }
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
}