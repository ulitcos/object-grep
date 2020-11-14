function tabs(node, callbacks) {
  const labels = node.querySelectorAll('[data-tabs-role="label"]');
  const pages = node.querySelectorAll('[data-tabs-role="page"]');

  function setCurrent(index) {
    callbacks[index] && callbacks[index]();
    labels.forEach((label) => {
      label.classList.remove('active');
    });

    pages.forEach((page) => {
      page.classList.remove('active');
    });

    labels[index] && labels[index].classList.add('active');
    pages[index] && pages[index].classList.add('active');
  }

  labels.forEach((label, index) => {
    label.addEventListener('click', setCurrent.bind(null, index))
  });

  setCurrent(0);
};
