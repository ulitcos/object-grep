
function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function grep({ target, searchExpr, result, depth }) {
  const queue = [{ target, depth, path: '', key: '' }];

  while (queue.length) {
    const { target, path, key, depth } = queue.shift();

    if (depth < 1) {
      return result;
    }

    if (key.match(searchExpr)) {
      result.inKeys[path] = target;
    }

    if (!isObject(target)) {
      if (String(target).match(searchExpr)) {
        result.inValues[path] = target;
      }

      continue;
    }

    Object.keys(target).forEach(
      key => queue.push({
        target: target[key],
        depth: depth - 1,
        path: !path ? key : `${path}.${key}`,
        key
      })
    );
  }

  return result;
}

export function objectGrep(target, searchExpr, depth = 20) {
  const result = Object.create({
    short: function () {
      return {
        inKeys: Object.keys(this.inKeys),
        inValues: Object.keys(this.inValues),
      };
    }
  },
    {
      inValues: { writable: true, configurable: true, enumerable: true, value: {} },
      inKeys: { writable: true, configurable: true, enumerable: true, value: {} }
    }
  );

  if (!searchExpr) {
    searchExpr = String(searchExpr);
  }

  return grep({
    target,
    searchExpr,
    depth,
    result
  });
}

const symbol = Symbol('grep');

objectGrep.inject = function (propertyName = 'grep') {
  if (propertyName in Object.prototype) {
    throw new Error(`Object.prototype already has ${propertyName}. Choose another name`);
  }

  const fn = function (regex, depth) {
    return objectGrep(this, regex, depth);
  };

  fn.symbol = symbol;

  Object.defineProperty(Object.prototype, propertyName, {
    configurable: true,
    enumerable: false,
    value: fn
  });
};

objectGrep.revoke = function () {
  const prototype = Object.prototype;

  Object.getOwnPropertyNames(prototype).forEach(name => {
    if (prototype[name]?.symbol === symbol) {
      delete prototype[name];
    }
  });
};
