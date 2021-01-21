/* Drag n drop */
(function() {
  const {getNodePosition} = utils;
  let currentNode = null;
  let shiftX = null;
  let shiftY = null;

  const ROOT = document.getElementById('root');

  function moveNode (e) {
    currentNode.style.left = `${e.pageX - shiftX}px`;
    currentNode.style.top = `${e.pageY - shiftY}px`;
  }

  function handleMouseDown(e) {
    if (!e.target.classList.contains('note__drag-area')) {
      return false;
    }

    currentNode = this;

    this.classList.add('note--is-moving');
    ROOT.classList.add('root--is-moving');

    const position = getNodePosition(this);
    shiftX = e.pageX - position.left;
    shiftY = e.pageY - position.top;
    document.addEventListener('mousemove', moveNode, false);
  }

  function handleMouseUp() {
    this.classList.remove('note--is-moving');
    ROOT.classList.remove('root--is-moving');
    currentNode = null;
    document.removeEventListener('mousemove', moveNode, false);
  }

  window.dragUtils = {
    handleMouseDown,
    handleMouseUp,
  }
})();

/* Resize */
(function() {
  const MIN_SIZE = 150;
  const ROOT = document.getElementById('root');

  let startX = null;
  let startY = null;
  let startWidth = null;
  let startHeight = null;
  let currentNode = null;

  function resizeNode(e) {
    const width = startWidth + e.clientX - startX;
    const height = startHeight + e.clientY - startY;
    currentNode.style.width = (width > MIN_SIZE) ? `${width}px` : `${MIN_SIZE}px`;
    currentNode.style.height = (height > MIN_SIZE) ? `${height}px` : `${MIN_SIZE}px`;
  }

  function handleResize(e) {
    if (!e.target.classList.contains('note__resize-area')) {
      return false;
    }

    currentNode = this;

    this.classList.add('note--is-moving');
    ROOT.classList.add('root--is-moving');

    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(this).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(this).height, 10);

    document.documentElement.addEventListener('mousemove', resizeNode, false);
  }

  function stopResize(e) {
    this.classList.remove('note--is-moving')
    ROOT.classList.remove('root--is-moving')
    currentNode = null;
    document.documentElement.removeEventListener('mousemove', resizeNode, false);
  }

  window.resizeUtils = {
    handleResize,
    stopResize,
  }
})();
