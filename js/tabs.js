function tabs(node, callbacks) {
  const select = node.querySelector('[data-tabs-role="select"]');

  function setCurrent(name) {
    callbacks[name] && callbacks[name]();
  }

  select.addEventListener('change', (e) => {
    setCurrent(e.target.value)
  });

  setCurrent('string');
};
