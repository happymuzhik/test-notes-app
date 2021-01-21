(function() {
  const {colorOptions, generateID} = utils;
  const [main, alt1, alt2] = colorOptions;

  class Note {
    constructor(title, text, color = main) {
      this.id = generateID('note');
      this.title = title;
      this.text = text;
      this.color = color;
      this.colorOptions = colorOptions;
      this.position = [0, 0];
    }

    setTitle(title) {
      this.title = title;
    }

    setText(text) {
      this.text = text;
    }

    setColor(color) {
      this.color = color;
    }

    setPosition(x, y) {
      this.position = [x, y];
    }
  }

  window.Note = Note;
})();
