(function () {
  const source = `const {objectGrep} = require('object-grep')

objectGrep.inject()

const obj = { a: { b : { c: 'd' } } }

obj.grep('b') // => {inKeys: {a.b: {c: 'd'}}, inValues: {}}
`;

  RunKit.createNotebook({
    gutterStyle: 'none',
    tabSize: 2,
    element: document.getElementById('runkit-inject'),
    source: source
  });
}());
