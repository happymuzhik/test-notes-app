(function() {
  const notes = {};

  const removeNote = (id) => {
    delete(notes[id]);
    view.notes.removeNote(id);
  }

  const saveNote = (id, note) => {
    notes[id].save(note);
  }

  const addNote = (title, text, color) => {
    const note = new Note(title, text, color);
    notes[note.id] = (note);
    view.notes.addNote(note, {
      removeNote,
      saveNote,
    });
  }

  window.app = {
    notes,
    addNote,
    saveNote,
  };

  app.addNote('Test title', 'test body');
})();
