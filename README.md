# object-grep
A tool for searching text in keys and content similar to linux grep

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

