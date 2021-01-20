(function() {
  const {getNodePosition} = utils;
  let currentNode = null;
  let shiftX = null;
  let shiftY = null;

  const ROOT = document.getElementById('root');

  function moveNode (e) {
    currentNode.style.left = e.pageX - shiftX + 'px';
    currentNode.style.top = e.pageY - shiftY + 'px';
  }

  function handleMouseDown(e) {
    this.classList.add('note--is-dragging')

    currentNode = this;
    const position = getNodePosition(this);
    shiftX = e.pageX - position.left;
    shiftY = e.pageY - position.top;
    document.addEventListener('mousemove', moveNode, false);
    ROOT.classList.add('root--is-dragging')
  }

  function handleMouseUp() {
    this.classList.remove('note--is-dragging')
    ROOT.classList.remove('root--is-dragging')
    document.removeEventListener('mousemove', moveNode, false);
  }

  window.dragUtils = {
    handleMouseDown,
    handleMouseUp,
  }
})();
