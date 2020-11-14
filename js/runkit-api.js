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
    string: source + 'objectGrep(obj, \'baz\') // => {keys: [\'foo.bar.baz\', \'foo.bar.baz.foo.bar.baz\'], values: [\'oof.rab.zab.2\']}',
    regexp: source + 'objectGrep(obj, /b.z/) // => {keys: [\'foo.bar.baz\', \'foo.bar.baz.foo.bar.baz\'], values: [\'oof.rab.zab.2\']}',
    depth: source + 'objectGrep(obj, /b.z/, 4) // => {keys: [\'foo.bar.baz\'], values: [\'oof.rab.zab.2\']}',
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

  const callbacks = [
    () => runKit.setSource(examples.string),
    () => runKit.setSource(examples.regexp),
    () => runKit.setSource(examples.depth),
  ];

  tabs(document.querySelector('#tabs-api'), callbacks);
}());
