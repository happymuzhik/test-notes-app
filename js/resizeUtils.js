(function() {
  const {MIN_SIZE, MAX_SIZE} = utils;
  const ROOT = document.getElementById('root');

  let startX = null;
  let startY = null;
  let startWidth = null;
  let startHeight = null;
  let currentNode = null;

  function resizeNode(e) {
    const _width = startWidth + e.clientX - startX;
    const _height = startHeight + e.clientY - startY;
    let width = _width;
    let height = _height;

    if (_width < MIN_SIZE) width = MIN_SIZE;
    if (_width > MAX_SIZE) width = MAX_SIZE;

    if (_height < MIN_SIZE) height = MIN_SIZE;
    if (_height > MAX_SIZE) height = MAX_SIZE;

    currentNode.style.width = `${width}px`;
    currentNode.style.height = `${height}px`;
  }

  function handleResize(e) {
    if (!e.target.classList.contains('note__resize-area')) {
      return false;
    }

    currentNode = e.currentTarget;

    e.currentTarget.classList.add('note--is-moving');
    ROOT.classList.add('root--is-moving');

    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(e.currentTarget).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(e.currentTarget).height, 10);

    document.documentElement.addEventListener('mousemove', resizeNode, false);
  }

  function stopResize(e) {
    e.currentTarget.classList.remove('note--is-moving')
    ROOT.classList.remove('root--is-moving')
    currentNode = null;
    document.documentElement.removeEventListener('mousemove', resizeNode, false);
  }

  window.resizeUtils = {
    handleResize,
    stopResize,
  }
})();
