(function() {
  const {colorOptions, generateID, DEFAULT_SIZE} = utils;
  const [main] = colorOptions;

  class Note {
    constructor({
      title = '',
      text = '',
      color = main,
      size = [DEFAULT_SIZE, DEFAULT_SIZE],
      position = [50, 50],
      zIndex = 10,
    }) {
      this.id = generateID('note');
      this.title = title;
      this.text = text;
      this.color = (colorOptions.includes(color)) ? color : main;
      this.colorOptions = colorOptions;
      this.size = size;
      this.position = position;
      this.zIndex = zIndex;
    }

    save({title, text, color, size, position, zIndex}) {
      this.title = title;
      this.text = text;
      this.color = color;
      this.size = size;
      this.position = position;
      this.zIndex = zIndex;
    }
  }

  window.Note = Note;
})();
