(function() {
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

  const addNote = ({title, text, color, size, position}) => {
    const note = new Note({title, text, color, size, position});
    notes[note.id] = (note);
    view.notes.addNote(note, {
      removeNote,
      saveNote,
    });

    appLocalStorage.set('notes', notes);
  }

  const restoreNotes = () => {
    const storedNotes = appLocalStorage.get('notes');
    if (typeof storedNotes === 'object') {
      for (const id in storedNotes) {
        const note = storedNotes[id];
        addNote(note);
      }
    }
  }

  window.app = {
    notes,
    addNote,
    saveNote,
    restoreNotes,
  };

  app.restoreNotes();
})();
