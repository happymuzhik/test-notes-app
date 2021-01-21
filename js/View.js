(function() {
  const {element, colorOptions} = utils;
  const {handleMouseDown, handleMouseUp} = dragUtils;
  const {handleResize, stopResize} = resizeUtils;

  class Note {
    render() {
      const [width, height] = this.size;
      const [top, left] = this.position;
      const style = {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
        backgroundColor: this.color,
      };
      const attr = {
        class: 'note',
      }
      this.node = element('div', attr, style);

      const itemsContainer = element('div', {class: 'note__items-container'});
      const dragArea = element('div', {class: 'note__drag-area'});
      const resizeArea = element('div', {class: 'note__resize-area'});

      itemsContainer.appendChild(element('h2', {class: 'note__title'}, null, this.title));
      itemsContainer.appendChild(element('p', {class: 'note__body'}, null, this.text));
      itemsContainer.appendChild(dragArea);
      itemsContainer.appendChild(resizeArea);

      colorOptions.forEach((color, i) => {
        const style = {
          left: `${15 * i}px`,
          backgroundColor: color,
        }
        const colorNode = element('div', {class: 'note__color-option'}, style);
        colorNode.addEventListener('click', () => {
          this.color = color;
          this.node.style.backgroundColor = color;
        });
        itemsContainer.appendChild(colorNode);
      });

      this.node.appendChild(itemsContainer);

      this.node.addEventListener('mousedown', handleMouseDown, false);
      this.node.addEventListener('mouseup', handleMouseUp, false);
      this.node.addEventListener('mousedown', handleResize, false);
      this.node.addEventListener('mouseup', stopResize, false);
    }

    constructor({title, text, color}) {
      this.title = title;
      this.text = text;
      this.color = color;
      this.size = [200, 200];
      this.position = [50, 50];

      this.render();
    }
  }

  class NotesArray {
    constructor() {
      this.node = document.getElementById('notes-container');
      this.notes = [];
    }

    addNote(note) {
      const newNote = new Note(note);
      this.notes.push(newNote);
      this.node.appendChild(newNote.node);
    }
  }

  window.view = {
    notes: new NotesArray(),
  };
})();
