/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
function push(arr, item) {
  arr[arr.length] = item;
  return arr.length;
}

function split(str) {
  const arr = [];
  for (let i = 0; i < str.length; i += 1) {
    push(arr, str[i]);
  }
  return arr;
}

function chunk(arr, n) {
  const result = [];
  if (!arr.length || n === 0) {
    return result;
  }
  if (!n) {
    n = 1;
  }
  if (n >= arr.length && arr instanceof Array) {
    return [arr];
  }
  for (let i = 0; i < Math.ceil(arr.length / n); i += 1) {
    const innerArr = [];
    for (let k = i * n; k < arr.length; k += 1) {
      push(innerArr, arr[k]);
      if (innerArr.length === n) {
        break;
      }
    }
    push(result, innerArr);
  }
  return result;
}

function compact(arr) {
  const result = [];
  if (!arr.length) {
    return result;
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i]) {
      push(result, arr[i]);
    }
  }
  return result;
}

function drop(arr, n) {
  const result = [];
  if (!arr.length) {
    return result;
  }
  if (n === undefined) {
    n = 1;
  }
  for (let i = n; i < arr.length; i += 1) {
    push(result, arr[i]);
  }
  return result;
}

function dropWhile(arr, cb) {
  const result = [];
  if (!arr.length) {
    return result;
  }
  let firstFalsyItem;
  for (let i = 0; i < arr.length; i += 1) {
    if (!cb(arr[i])) {
      firstFalsyItem = i;
      break;
    }
  }
  for (let i = firstFalsyItem; i < arr.length; i += 1) {
    push(result, arr[i]);
  }
  return result;
}

function take(arr, n) {
  const result = [];
  if (!arr.length || n === 0) {
    return result;
  }
  if (n === undefined) {
    n = 1;
  }

  for (let i = 0; i < n; i += 1) {
    push(result, arr[i]);
    if (result.length >= arr.length) break;
  }
  return result;
}

function filter(collection, cb) {
  const result = [];
  if (collection instanceof Object) {
    const values = [];
    for (const key in collection) {
      push(values, collection[key]);
    }
    for (let i = 0; i < values.length; i += 1) {
      if (cb(values[i])) {
        push(result, values[i]);
      }
    }
  }

  if (typeof collection === 'string') {
    for (let i = 0; i < collection.length; i += 1) {
      if (cb(collection[i])) {
        push(result, collection[i]);
      }
    }
  }
  return result;
}

function find(collection, cb, fromIndex) {
  let result;
  if (fromIndex === undefined) {
    fromIndex = 0;
  }

  if (collection instanceof Object) {
    const values = [];
    for (const key in collection) {
      push(values, collection[key]);
    }
    if (fromIndex < 0) {
      fromIndex = values.length - Math.abs(fromIndex);
    }
    for (let i = fromIndex; i < values.length; i += 1) {
      if (cb(values[i])) {
        return values[i];
      }
    }
  }

  if (typeof collection === 'string') {
    if (fromIndex < 0) {
      fromIndex = collection.length - Math.abs(fromIndex);
    }
    for (let i = fromIndex; i < collection.length; i += 1) {
      if (cb(collection[i])) {
        return collection[i];
      }
    }
  }
  return result;
}

function includes(collection, value, fromIndex) {
  if (fromIndex === undefined) {
    fromIndex = 0;
  }

  if (collection instanceof Object) {
    const values = [];
    for (const key in collection) {
      push(values, collection[key]);
    }
    if (fromIndex < 0) {
      fromIndex = values.length - Math.abs(fromIndex);
    }
    for (let i = fromIndex; i < values.length; i += 1) {
      if (values[i] == value) {
        return true;
      }
    }
  }

  if (typeof collection === 'string') {
    if (collection.indexOf(value) !== -1) {
      return true;
    }
  }
  return false;
}

function map(collection, cb) {
  const result = [];
  if (collection instanceof Object) {
    const values = [];
    for (const key in collection) {
      push(values, collection[key]);
    }
    for (let i = 0; i < values.length; i += 1) {
      push(result, cb(values[i]));
    }
  }

  if (typeof collection === 'string') {
    for (let i = 0; i < collection.length; i += 1) {
      if (cb(collection[i])) {
        push(result, cb(collection[i]));
      }
    }
  }
  return result;
}

function zip(...args) {
  const arrays = [];
  const lengths = [];
  const result = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] instanceof Array) {
      push(arrays, args[i]);
      push(lengths, args[i].length);
    }
  }
  const maxLength = Math.max(...lengths);
  for (let i = 0; i < maxLength; i += 1) {
    result[i] = [];
    for (let j = 0; j < arrays.length; j += 1) {
      push(result[i], arrays[j][i]);
    }
  }
  return result;
}

function merge(obj, sourceObj) {
  for (const key in sourceObj) {
    obj[key] = sourceObj[key];
  }
  return obj;
}

function omit(obj, keys) {
  const result = {};
  if (typeof obj === 'string') {
    obj = split(obj);
  }
  if (obj instanceof Object) {
    for (const key in obj) {
      if (!keys.length) {
        if (key != keys) {
          result[key] = obj[key];
        }
      } else if (!includes(keys, key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

function omitBy(obj, cb) {
  const result = {};
  if (typeof obj === 'string') {
    obj = split(obj);
  }
  if (obj instanceof Object) {
    for (const key in obj) {
      if (!cb(obj[key])) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

function pick(obj, keys) {
  const result = {};
  if (typeof obj === 'string') {
    obj = split(obj);
  }
  if (obj instanceof Object) {
    for (const key in obj) {
      if (!keys.length) {
        if (key == keys) {
          result[key] = obj[key];
        }
      } else if (includes(keys, key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

function pickBy(obj, cb) {
  const result = {};
  if (typeof obj === 'string') {
    obj = split(obj);
  }
  if (obj instanceof Object) {
    for (const key in obj) {
      if (cb(obj[key])) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

function toPairs(obj) {
  const result = [];
  if (typeof obj === 'string') {
    obj = split(obj);
  }
  if (obj instanceof Object) {
    for (const key in obj) {
      const innerArr = [];
      push(innerArr, key);
      push(innerArr, obj[key]);
      push(result, innerArr);
    }
  }
  return result;
}

module.exports = {
  chunk,
  compact,
  drop,
  dropWhile,
  take,
  filter,
  find,
  includes,
  map,
  zip,
  merge,
  omit,
  omitBy,
  pick,
  pickBy,
  toPairs,
};
