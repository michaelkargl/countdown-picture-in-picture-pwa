export type Optional<T> = T | null | undefined;
export type ValueProvider<T> = () => T;
export type BooleanValueProvider = ValueProvider<boolean>;

export class Exception extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Exception"
  }

  public static ThrowIf(condition: boolean | BooleanValueProvider, ex: Exception) {
    if (typeof condition === "function") {
      condition = (condition as BooleanValueProvider)()
    }

    if (Boolean(condition)) {
      throw ex
    }
  }

  public static ThrowIfNot(value: boolean | ValueProvider<boolean>, exception: Exception) {
    if (typeof value === "function") {
      value = (value as ValueProvider<boolean>)();
    }

    if (!value) {
      console.error('%s. Value [%o].', exception, value);
    }

    return this.ThrowIf(!value, exception);
  }
}