(function() {
  const {element, colorOptions} = utils;
  const {handleMouseDown, handleMouseUp} = dragUtils;
  const {handleResize, stopResize} = resizeUtils;

  class Note {
    renderForm() {
      this.nodes.form = element('form', {class: 'note__form'});

      const titleAttrs = {
        value: this.data.title,
        placeholder: 'Title',
        autocomplete: 'off',
        type: 'text',
        name: `${this.id}_title-input`,
        class: 'note__title-input',
        required: 'true',
      }
      this.nodes.titleInput = element('input', titleAttrs);

      const textAttrs = {
        placeholder: 'Text',
        autocomplete: 'off',
        name: `${this.id}_text-input`,
        class: 'note__text-input',
      }
      this.nodes.textInput = element('textarea', textAttrs, null, this.data.text);

      this.nodes.form.appendChild(this.nodes.titleInput);
      this.nodes.form.appendChild(this.nodes.textInput);
      this.nodes.itemsContainer.appendChild(this.nodes.form);
    }

    renderBody() {
      this.nodes.itemsContainer.appendChild(element('h2', {class: 'note__title'}, null, this.data.title));
      this.nodes.itemsContainer.appendChild(element('p', {class: 'note__body'}, null, this.data.text));
    }

    render() {
      if (this.rootNode) {
        this.rootNode.innerHTML = null;
      } else {
        const [width, height] = this.data.size;
        const [top, left] = this.data.position;
        const style = {
          width: `${width}px`,
          height: `${height}px`,
          top: `${top}px`,
          left: `${left}px`,
          backgroundColor: this.data.color,
        };
        this.rootNode = element('div', {class: 'note'}, style);

        this.rootNode.addEventListener('mousedown', (e) => this.onDragStart(e), false);
        this.rootNode.addEventListener('mouseup', (e) => this.onDragEnd(e), false);
      }

      this.nodes.itemsContainer = element('div', {class: 'note__items-container'});
      this.nodes.dragArea = element('div', {class: 'note__drag-area'});
      this.nodes.resizeArea = element('div', {class: 'note__resize-area'});

      if (this.isEditing) {
        this.renderForm();
      } else {
        this.renderBody();
      }

      this.nodes.itemsContainer.appendChild(this.nodes.dragArea);
      this.nodes.itemsContainer.appendChild(this.nodes.resizeArea);

      this.nodes.colorOptionsContainer = element('div', {class: 'note__color-options'});
      colorOptions.forEach((color, i) => {
        const style = {
          left: `${5 + 15 * i}px`,
          backgroundColor: color,
        }
        const colorNode = element('div', {class: 'note__color-option'}, style);
        colorNode.addEventListener('click', () => this.switchColor(color));
        this.nodes.colorOptionsContainer.appendChild(colorNode);
      });
      this.nodes.dragArea.appendChild(this.nodes.colorOptionsContainer);

      this.nodes.buttonsContainer = element('div', {class: 'note__buttons-container'});
      this.nodes.dragArea.appendChild(this.nodes.buttonsContainer);

      if (this.isEditing) {
        this.nodes.editButton = null;
        this.nodes.removeButton = null;

        this.nodes.saveButton = element('div', {class: 'note__save-button'}, null, '	&#10004;');
        this.nodes.saveButton.addEventListener('click', () => this.saveNote(), false);
        this.nodes.buttonsContainer.appendChild(this.nodes.saveButton);

        this.nodes.cancelButton = element('div', {class: 'note__cancel-button'}, null, '&#10006;');
        this.nodes.cancelButton.addEventListener('click', () => this.cancelEdit(), false);
        this.nodes.buttonsContainer.appendChild(this.nodes.cancelButton);
      } else {
        this.nodes.cancelButton = null;

        this.nodes.editButton = element('div', {class: 'note__edit-button'}, null, '&#9998;');
        this.nodes.editButton.addEventListener('click', () => this.editNote(), false);
        this.nodes.buttonsContainer.appendChild(this.nodes.editButton);

        this.nodes.removeButton = element('div', {class: 'note__remove-button'}, null, '&#128465;');
        this.nodes.removeButton.addEventListener('click', () => this.removeNote(), false);
        this.nodes.buttonsContainer.appendChild(this.nodes.removeButton);
      }

      this.rootNode.appendChild(this.nodes.itemsContainer);
    }

    onDragStart(e) {
      handleMouseDown(e);
      handleResize(e);
    }

    onDragEnd(e) {
      handleMouseUp(e);
      stopResize(e);

      const {dragArea, resizeArea} = this.nodes;
      if ([dragArea, resizeArea].includes(e.target)) {
        const {left, top, width, height} = this.rootNode.style;
        this.data.position = [parseInt(left, 10), parseInt(top, 10)];
        this.data.size = [parseInt(width, 10), parseInt(height, 10)];
        this.updateNote();
      }
    }

    switchColor(color) {
      this.data.color = color;
      this.rootNode.style.backgroundColor = color;
      this.updateNote();
    }

    editNote() {
      this.isEditing = true;
      this.render();
      this.nodes.titleInput.focus();
    }

    cancelEdit() {
      this.isEditing = false;
      this.render();
    }

    updateNote() {
      const {saveNote} = this.handlers;
      saveNote(this.id, this.data);
    }

    saveNote() {
      if (this.nodes.form.checkValidity()) {
        this.isEditing = false;
        this.data.title = this.nodes.titleInput.value;
        this.data.text = this.nodes.textInput.value;
        this.render();
        this.updateNote(this.data);
      }
    }

    removeNote() {
      const {removeNote} = this.handlers;
      removeNote(this.id);
    }

    constructor({id, title, text, color, size, position}, handlers) {
      this.id = id;
      this.data = {};
      this.data.title = title;
      this.data.text = text;
      this.data.color = color;
      this.data.size = size;
      this.data.position = position;
      this.isEditing = false;
      this.rootNode = null;
      this.nodes = {};

      this.handlers = handlers;

      this.render();
    }
  }

  class NotesArray {
    constructor() {
      this.rootNode = document.getElementById('notes-container');
      this.notes = {};
    }

    addNote(note, handlers) {
      const newNote = new Note(note, handlers);
      this.notes[note.id] = newNote;
      this.rootNode.appendChild(newNote.rootNode);
    }

    removeNote(id) {
      if (id) {
        const note = this.notes[id];
        this.rootNode.removeChild(note.rootNode);
        delete(this.notes[id]);
      }
    }
  }

  window.view = {
    notes: new NotesArray(),
  };
})();
