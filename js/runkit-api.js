(function () {
  const source = `const {objectGrep} = require('object-grep')

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

`;
  const examples = {
    string: source + 'objectGrep(obj, \'baz\') // => {inKeys: {\'foo.bar.baz\': {...}, \'foo.bar.baz.foo.bar.baz\': \'zab\'}, inValues: {\'oof.rab.zab.2\': \'zab\'}}',
    regexp: source + 'objectGrep(obj, /b.z/) // => {inKeys: {\'foo.bar.baz\': {...}, \'foo.bar.baz.foo.bar.baz\': \'zab\'}, inValues: {\'oof.rab.zab.2\': \'zab\'}}',
    depth: source + 'objectGrep(obj, /b.z/, 4) // => {inKeys: {\'foo.bar.baz\': {...}}, inValues: {\'oof.rab.zab.2\': \'zab\'}}',
    short: source + 'objectGrep(obj, \'baz\').short() // => {inKeys: [\'foo.bar.baz\', \'foo.bar.baz.foo.bar.baz\'], inValues: [\'oof.rab.zab.2\']}',
  };

  const commonProps = {
    gutterStyle: 'none',
    tabSize: 2,
  };

  const runKit = RunKit.createNotebook({
    ...commonProps,
    element: document.getElementById('runkit-api'),
    source: examples.string
  });

  runKit.onLoad = () => {
    document.querySelector('#runkit-api').className = '';
  };

  const callbacks = {
    string: () => runKit.setSource(examples.string),
    regexp: () => runKit.setSource(examples.regexp),
    depth: () => runKit.setSource(examples.depth),
    short: () => runKit.setSource(examples.short),
  };

  tabs(document.querySelector('#tabs-api'), callbacks);
}());
