export function objectGrep(obj, searchExpr, depth = 100, path = '', result = {}) {
  if (depth === 0) {
    return result;
  }

  if (!searchExpr) {
    searchExpr = String(searchExpr);
  }

  Object.keys(obj).forEach((key) => {
    const keyPath = !path ? key : `${path}.${key}`;
    const value = obj[key];

    if (key.match(searchExpr)) {
      if (!result.keys) {
        result.keys = [];
      }

      result.keys.push(keyPath);
    }

    if (['string', 'number', 'boolean', 'undefined'].includes(typeof value) || value === null) {
      if (String(value).match(searchExpr)) {
        if (!result.values) {
          result.values = [];
        }

        result.values.push(keyPath);
      }

      return;
    }

    objectGrep(value, searchExpr, depth - 1, keyPath, result);
  });

  return result;
}

objectGrep.inject = function () {
  Object.defineProperty(Object.prototype, 'grep', {
    enumerable: false,
    value: function (regex, depth) {
      return objectGrep(this, regex, depth);
    }
  });
};
