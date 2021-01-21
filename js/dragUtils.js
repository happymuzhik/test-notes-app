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
