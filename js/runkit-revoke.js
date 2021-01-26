(function () {
  const source = `const {objectGrep} = require('object-grep')

objectGrep.inject()

Object.prototype.grep // => ƒ (regex, depth) {...}

objectGrep.revoke()

Object.prototype.grep // => undefined
`;

  RunKit.createNotebook({
    gutterStyle: 'none',
    tabSize: 2,
    element: document.getElementById('runkit-revoke'),
    source: source
  });
}());
