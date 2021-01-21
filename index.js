(function() {
  const notes = {};

  const removeNote = (id) => {
    delete(notes[id]);
    view.notes.removeNote(id);
  }

  const addNote = (title, text, color) => {
    const note = new Note(title, text, color);
    notes[note.id] = (note);
    view.notes.addNote(note, {
      removeNote,
    });
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
