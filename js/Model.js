(function() {
  const [main, alt1, alt2] = ['#DEE96D', '#F40', '#FFF'];

  class Note {
    constructor(title, text, color = main) {
      this.title = title;
      this.text = text;
      this.color = color;
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
