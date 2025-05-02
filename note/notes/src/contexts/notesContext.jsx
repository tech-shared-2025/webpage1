import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [currentNote, setCurrentNote] = useState({ id: '', title: '', content: '', lastEdited: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      lastEdited: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setEditMode(true);
  };
  
  const handleSaveNote = () => {
    if (!currentNote.id) return;
    
    const updatedNote = {
      ...currentNote,
      lastEdited: new Date().toISOString()
    };
    
    const updatedNotes = notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    );
    
    setNotes(updatedNotes);
    setCurrentNote(updatedNote);
    setEditMode(false);
  };
  
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    if (currentNote.id === id) {
      setCurrentNote({ id: '', title: '', content: '', lastEdited: null });
    }
  };
  
  const handleNoteSelect = (note) => {
    setCurrentNote(note);
    setEditMode(false);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <NotesContext.Provider value={{
      notes,
      currentNote,
      searchTerm,
      editMode,
      filteredNotes,
      setNotes,
      setCurrentNote,
      setSearchTerm,
      setEditMode,
      handleCreateNewNote,
      handleSaveNote,
      handleDeleteNote,
      handleNoteSelect,
      formatDate
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);