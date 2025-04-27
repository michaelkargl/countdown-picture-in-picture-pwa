import { Exception, Optional, ValueProvider } from "./Exception"

export type OptionalValueProvider = ValueProvider<Optional<unknown>>;

export class ResourceNotFoundException extends Error {
  constructor(message: string, resourceName = '') {
    super(`ResourceNotFoundException: ${resourceName} ${message}`)
    this.name = "ResourceNotFoundException"
  }

  public static ThrowIfEmptyOrFalsy(collection: unknown[], name: string): void {
    Exception.ThrowIfNot(
      () => collection?.length > 0,
      new ResourceNotFoundException(`Collection [${name}] is empty or falsy!`)
    );
  }

  public static ThrowIfNullOrUndefined<T>(
    value?: Optional<unknown> | OptionalValueProvider,
    name?: string
  ): value is T {

    if (typeof value === 'function') {
      value = (value as ValueProvider<T>)();
    }

    Exception.ThrowIf(
      () => value === undefined || value === null,
      new ResourceNotFoundException('Resource not found', name)
    );

    return true;
  }
}