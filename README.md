# object-grep
A javascript tool for searching inside objects inspired by linux grep

## installation

```bash
npm i object-grep
```
or
```bash
yarn add object-grep
```

## arguments

**targetObject**: [`object` | `array` | `function` | `string`] - a target object where all keys and property contents will be recursively checked for matching searchExpr

**searchExpr**: [`string` | `regexp`] - expression for checking for compliance

**depth limit**?: [`number`] - the number of levels to check. objectGrep works synchronously, which can cause the browser to freeze if the object being checked is very large. The default value is 100

## usage

```javascript
const obj = {
  foo: {
    bar: {
      baz: {
        foo: {
          bar: {
            baz: 'zab'
          }
        }
      }    
    }
  },
  oof: {
    rab: {
      zab: ['foo', 'bar', 'baz', 'zab', 'rab', 'oof']
    }
  }
}

objectGrep(obj, 'baz') // => {keys: ['foo.bar.baz', 'foo.bar.baz.foo.bar.baz'], values: ['oof.rab.zab.2']}

// or regexp

objectGrep(obj, /b.z/) // => {keys: ['foo.bar.baz', 'foo.bar.baz.foo.bar.baz'], values: ['oof.rab.zab.2']}

// or with depth limit

objectGrep(obj, /b.z/, 4) // => {keys: ['foo.bar.baz'], values: ['oof.rab.zab.2']}
```

## inject

It can be added to the object prototype

```javascript
objectGrep.inject()

const obj = { a: { b : { c: 'd' } } }

obj.grep('b') // => {keys: ['a.b']}
```

## chrome extension

You can also install a [browser extension](https://github.com/ulitcos/object-grep-chrome-extension) and use object-grep on any site without any extra effort

