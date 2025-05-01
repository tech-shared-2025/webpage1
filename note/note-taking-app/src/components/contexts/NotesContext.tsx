import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../models/Note';
import { saveNotes, getNotes } from '../utils/storage';

interface NotesContextProps {
  notes: Note[];
  currentNote: Note | null;
  createNote: () => void;
  updateNote: (id: string, data: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setCurrentNote: (id: string) => void;
}

export const NotesContext = createContext<NotesContextProps>({} as NotesContextProps);

export const NotesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNoteState] = useState<Note | null>(null);

  useEffect(() => {
    const savedNotes = getNotes();
    if (savedNotes.length > 0) {
      setNotes(savedNotes);
      setCurrentNoteState(savedNotes[0]);
    } else {
      // Create default note if no notes exist
      const defaultNote = {
        id: uuidv4(),
        title: 'Welcome Note',
        content: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes([defaultNote]);
      setCurrentNoteState(defaultNote);
      saveNotes([defaultNote]);
    }
  }, []);

  // Save notes whenever the notes state changes
  useEffect(() => {
    if (notes.length > 0) {
      saveNotes(notes);
    }
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'New Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setNotes(prevNotes => [...prevNotes, newNote]);
    setCurrentNoteState(newNote);
  };

  const updateNote = (id: string, data: Partial<Note>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, ...data, updatedAt: new Date() } 
          : note
      )
    );
    
    if (currentNote?.id === id) {
      setCurrentNoteState(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    
    if (currentNote?.id === id) {
      const remainingNotes = notes.filter(note => note.id !== id);
      setCurrentNoteState(remainingNotes.length > 0 ? remainingNotes[0] : null);
    }
  };

  const setCurrentNote = (id: string) => {
    const note = notes.find(note => note.id === id) || null;
    setCurrentNoteState(note);
  };

  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        currentNote, 
        createNote, 
        updateNote, 
        deleteNote, 
        setCurrentNote 
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
