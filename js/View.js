(function() {
  const {element, colorOptions, DEFAULT_SIZE} = utils;
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
      this.node = element('div', {class: 'note'}, style);

      const itemsContainer = element('div', {class: 'note__items-container'});
      const dragArea = element('div', {class: 'note__drag-area'});
      const resizeArea = element('div', {class: 'note__resize-area'});

      itemsContainer.appendChild(element('h2', {class: 'note__title'}, null, this.title));
      itemsContainer.appendChild(element('p', {class: 'note__body'}, null, this.text));
      itemsContainer.appendChild(dragArea);
      itemsContainer.appendChild(resizeArea);

      const colorOptionsContainer = element('div', {class: 'note__color-options'});
      colorOptions.forEach((color, i) => {
        const style = {
          left: `${5 + 15 * i}px`,
          backgroundColor: color,
        }
        const colorNode = element('div', {class: 'note__color-option'}, style);
        colorNode.addEventListener('click', () => {
          this.color = color;
          this.node.style.backgroundColor = color;
        });
        colorOptionsContainer.appendChild(colorNode);
      });
      dragArea.appendChild(colorOptionsContainer);

      const buttonsContainer = element('div', {class: 'note__buttons-container'});
      dragArea.appendChild(buttonsContainer);

      const editButton = element('div', {class: 'note__edit-button'}, null, '&#9998;');
      buttonsContainer.appendChild(editButton);

      const removeButton = element('div', {class: 'note__remove-button'}, null, '&#10006;');
      removeButton.addEventListener('click', () => this.removeNote(), false);
      buttonsContainer.appendChild(removeButton);

      this.node.appendChild(itemsContainer);

      this.node.addEventListener('mousedown', handleMouseDown, false);
      this.node.addEventListener('mouseup', handleMouseUp, false);
      this.node.addEventListener('mousedown', handleResize, false);
      this.node.addEventListener('mouseup', stopResize, false);
    }

    removeNote() {
      const {removeNote} = this.handlers;
      removeNote(this.id);
    }

    constructor({id, title, text, color}, handlers) {
      this.id = id;
      this.title = title;
      this.text = text;
      this.color = color;
      this.size = [DEFAULT_SIZE, DEFAULT_SIZE];
      this.position = [50, 50];

      this.handlers = handlers;

      this.render();
    }
  }

  class NotesArray {
    constructor() {
      this.node = document.getElementById('notes-container');
      this.notes = {};
    }

    addNote(note, handlers) {
      const newNote = new Note(note, handlers);
      this.notes[note.id] = newNote;
      this.node.appendChild(newNote.node);
    }

    removeNote(id) {
      if (id) {
        const note = this.notes[id];
        this.node.removeChild(note.node);
        delete(this.notes[id]);
        console.log(this.notes)
      }
    }
  }

  window.view = {
    notes: new NotesArray(),
  };
})();
