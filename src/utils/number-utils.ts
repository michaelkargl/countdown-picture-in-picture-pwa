
export function pad(num: number, size: number): string {
  let numberString = num.toString();

  while (numberString.length < size) {
    numberString = `0${numberString}`;
  }

  return numberString;
}