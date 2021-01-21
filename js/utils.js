(function() {
  const colorOptions = ['#DEE96D', '#E190FF', '#FFF'];

  const element = function(el, attr, style, text){
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

    if (text && typeof text == 'string'){
      node.innerText = text;
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

  window.utils = {
    colorOptions,
    element,
    getNodePosition,
  }
})();
