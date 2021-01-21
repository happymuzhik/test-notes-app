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

    currentNode = e.currentTarget;

    e.currentTarget.classList.add('note--is-moving');
    ROOT.classList.add('root--is-moving');

    const position = getNodePosition(e.currentTarget);
    shiftX = e.pageX - position.left;
    shiftY = e.pageY - position.top;
    const container = document.getElementById('notes-container');
    container.addEventListener('mousemove', moveNode, false);
  }

  function handleMouseUp(e) {
    e.currentTarget.classList.remove('note--is-moving');
    ROOT.classList.remove('root--is-moving');
    currentNode = null;
    const container = document.getElementById('notes-container');
    container.removeEventListener('mousemove', moveNode, false);
  }

  window.dragUtils = {
    handleMouseDown,
    handleMouseUp,
  }
})();
