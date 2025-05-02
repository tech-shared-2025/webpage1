import { createContext, useContext } from 'react';
import useLocalStorage from '../useLocalStorage';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [currentNoteId, setCurrentNoteId] = useLocalStorage('currentNoteId', '');

  // Get the current note
  const currentNote = notes.find(note => note.id === currentNoteId) || null;

  // Create a new note
  const createNote = ({ title, content }) => {
    const newNote = {
      id: Date.now().toString(),
      title: title || 'Untitled Note',
      content: content || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
    return newNote;
  };

  // Update a note
  const updateNote = (id, updates) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date().toISOString() } 
          : note
      )
    );
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    
    if (currentNoteId === id) {
      const remainingNotes = notes.filter(note => note.id !== id);
      setCurrentNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : '');
    }
  };

  const value = {
    notes,
    currentNote,
    currentNoteId,
    setCurrentNoteId,
    createNote,
    updateNote,
    deleteNote
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}