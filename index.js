(function() {
  const notes = [];
  const addNote = (title, text, color) => {
    const note = new Note(title, text, color);
    notes.push(note);
    view.notes.addNote(note);
  }

  window.app = {
    notes,
    addNote,
  };

  app.addNote('Test title', 'test body');
  app.addNote('Test title', 'test body');
  app.addNote('Test title', 'test body');
  app.addNote('Test title', 'test body');
})();
