(function() {
  const {getRandomPosition} = utils;

  const notes = {};

  const removeNote = (id) => {
    delete(notes[id]);
    view.notes.removeNote(id);
    appLocalStorage.set('notes', notes);
  }

  const saveNote = (id, note) => {
    notes[id].save(note);
    appLocalStorage.set('notes', notes);
  }

  const addNote = ({title, text, color, size, position, zIndex}, isEditing = true) => {
    const note = new Note({title, text, color, size, position, zIndex});
    notes[note.id] = (note);
    view.notes.addNote(note, {
      removeNote,
      saveNote,
    }, isEditing);

    appLocalStorage.set('notes', notes);
  }

  const restoreNotes = () => {
    const storedNotes = appLocalStorage.get('notes');
    if (typeof storedNotes === 'object') {
      for (const id in storedNotes) {
        const note = storedNotes[id];
        addNote(note, false);
      }
    }
  }

  const clearNotes = () => {
    for (const id in notes) {
      removeNote(id);
    }
  }

  view.controls.addButton('Add Note', () => {
    const position = getRandomPosition();
    addNote({title: 'New Note', position}, true)
  });

  view.controls.addButton('Clear', () => clearNotes(), true);

  window.app = {
    notes,
    addNote,
    saveNote,
    restoreNotes,
  };

  app.restoreNotes();
})();
