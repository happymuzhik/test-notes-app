(function() {
  const {getNodePosition} = utils;
  let currentNode = null;
  let shiftX = null;
  let shiftY = null;

  function moveNode (e) {
    currentNode.style.left = e.pageX - shiftX + 'px';
    currentNode.style.top = e.pageY - shiftY + 'px';
  }

  function handleMouseDown(e) {
    this.style.opacity = '0.4';
    this.style.zIndex = 100;
    currentNode = this;

    const position = getNodePosition(this);
    shiftX = e.pageX - position.left;
    shiftY = e.pageY - position.top;

    document.addEventListener('mousemove', moveNode, false)
  }

  function handleMouseUp() {
    this.style.opacity = '1';
    document.removeEventListener('mousemove', moveNode, false);
  }

  window.dragUtils = {
    handleMouseDown,
    handleMouseUp,
  }
})();
