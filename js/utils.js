(function() {
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

  const getNodePosition = (node) => {   // кроме IE8-
    var box = node.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  window.utils = {
    element,
    getNodePosition,
  }
})();
