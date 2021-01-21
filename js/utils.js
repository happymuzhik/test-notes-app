(function() {
  const colorOptions = ['#DEE96D', '#E190FF', '#FFF'];
  const DEFAULT_SIZE = 200;
  const MIN_SIZE = 150;
  const MAX_SIZE = 400;

  const element = function(el, attr, style, content){
    const node = document.createElement(el);

    if (attr && typeof attr == 'object'){
      for(let k in attr) {
        node.setAttribute(k,attr[k]);
      };
    }

    if (style && typeof style == 'object'){
      for(let k in style) {
        node.style[k] = style[k];
      };
    }

    if (content){
      node.innerHTML = content;
    }

    return node;
  };

  const getNodePosition = (node) => {
    var box = node.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  const generateID = (prefix = 'id') => (
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  );

  const getRandomNumber = (max) => {
    return 10 * Math.floor(Math.random() * Math.floor(max));
  }

  const getRandomPosition = () => {
    const top = getRandomNumber(40);
    const left = getRandomNumber(60);
    return [top, left];
  }

  window.utils = {
    colorOptions,
    DEFAULT_SIZE,
    MIN_SIZE,
    MAX_SIZE,
    element,
    getNodePosition,
    generateID,
    getRandomPosition,
  }
})();
