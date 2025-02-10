export function areValuesEqual<T extends Record<string, any>>(
  a: Partial<T>,
  b: Partial<T>
): boolean {
  const isEqual = (a: any, b: any): boolean => {
    if (a === b) return true;

    // Handle Date objects
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    // Handle objects recursively
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) return false;

      return keysA.every((key) => isEqual(a[key], b[key]));
    }

    return false;
  };

  return isEqual(a, b);
}

export function filterNonEmptyFields<T extends Record<string, any>>(input: T): Partial<T> {
  return Object.entries(input).reduce((acc, [key, value]) => {
    if (
      value !== undefined && // Exclude undefined
      value !== null && // Exclude null
      (typeof value !== 'string' || value.trim() !== '') // Exclude empty strings
    ) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}
