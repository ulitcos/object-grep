# object-grep

[![Build Status](https://travis-ci.com/ulitcos/object-grep.svg?branch=master)](https://travis-ci.com/ulitcos/object-grep)

A javascript tool for searching inside objects, inspired by linux grep. The tool performs a deep search in javascript objects, returning back lists of keys and values that fit the search parameters, this is especially useful when debugging. Regular expressions are used under the hood, so you can customize your search queries very flexibly.

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

**depth limit**?: [`number`] - the number of levels to check. objectGrep works synchronously, which can cause the
browser to freeze if the object being checked is very large. The default value is 20

## usage

```javascript
const target = {
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

objectGrep(target, 'baz') // => {inKeys: {'foo.bar.baz':  {foo: {…}}, 'foo.bar.baz.foo.bar.baz': 'zab'}, inValues: {'oof.rab.zab.2': 'baz'}}

// or regexp

objectGrep(target, /b.z/) // => {inKeys: {'foo.bar.baz':  {foo: {…}}, 'foo.bar.baz.foo.bar.baz': 'zab'}, inValues: {'oof.rab.zab.2': 'baz'}}

// or with depth limit

objectGrep(target, /b.z/, 4) // => {inKeys: {'foo.bar.baz':  {foo: {…} }}, inValues: {'oof.rab.zab.2': 'baz'}}
```

## short view

You can also use a short output format. To do this, call the `short()` method on the result. This way you will only see
paths to keys and values with no data stored on those paths

```javascript
const target = {
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

objectGrep(target, 'baz').short() // => {inKeys: ['foo.bar.baz', 'foo.bar.baz.foo.bar.baz'], inValues: ['oof.rab.zab.2']}

// or regexp

objectGrep(target, /b.z/).short() // => {inKeys: ['foo.bar.baz', 'foo.bar.baz.foo.bar.baz'], inValues: ['oof.rab.zab.2']}

// or with depth limit

objectGrep(target, /b.z/, 4).short() // => {inKeys: ['foo.bar.baz'], inValues: ['oof.rab.zab.2']}
```

## inject

It can be added to the object prototype. This way it will be possible to call grep from any object

```javascript
objectGrep.inject()

const target = {a: {b: {c: 'd'}}}

target.grep('b') // => {inKeys: {a.b: {c: 'd'}}, inValues: {}}
```

You can set any name for the method if you don't like grep

```javascript
objectGrep.inject('deepSearch')

const target = {a: {b: {c: 'd'}}}

target.deepSearch('b') // => {inKeys: {a.b: {c: 'd'}}, inValues: {}}
```

## revoke

To cancel injection use the revoke method. Calling revoke will return the
object prototype to its original form

```javascript
objectGrep.inject()

Object.prototype.grep // => ƒ (regex, depth) {...}

objectGrep.revoke()

Object.prototype.grep // => undefined
```

## chrome extension

You can also install a [browser extension](https://github.com/ulitcos/object-grep-chrome-extension) and use object-grep
on any site without any extra effort

