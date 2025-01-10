export function set(obj: any, path: any, value: any) {
  if (!obj || typeof obj !== "object") return obj;

  const keys = Array.isArray(path) ? path : path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      // Create an object or array based on the next key type
      current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
}

export function isEqual(value1:any, value2:any): boolean {
  // Handle primitives and references to the same object
  if (value1 === value2) {
    return true;
  }

  // Handle null/undefined
  if (value1 == null || value2 == null) {
    return value1 === value2;
  }

  // Handle different types
  if (typeof value1 !== typeof value2) {
    return false;
  }

  // Handle dates
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() === value2.getTime();
  }

  // Handle regular expressions
  if (value1 instanceof RegExp && value2 instanceof RegExp) {
    return value1.toString() === value2.toString();
  }

  // Handle arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }
    return value1.every((val, index) => isEqual(val, value2[index]));
  }

  // Handle objects
  if (typeof value1 === 'object') {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keys1.every(key => {
      if (!Object.prototype.hasOwnProperty.call(value2, key)) {
        return false;
      }
      return isEqual(value1[key], value2[key]);
    });
  }

  return false;
}
