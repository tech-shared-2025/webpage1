import React from 'react';
import { useNotes } from '../../contexts/NotesContext';

const NoteItem = ({ note }) => {
  const { currentNote, handleNoteSelect, formatDate } = useNotes();
  
  const isActive = currentNote.id === note.id;
  
  return (
    <li 
      className={`note-item ${isActive ? 'active' : ''}`}
      onClick={() => handleNoteSelect(note)}
    >
      <h3 className="note-item-title">{note.title}</h3>
      <p className="note-item-preview">{note.content}</p>
      <p className="note-item-date">
        {formatDate(note.lastEdited)}
      </p>
    </li>
  );
};

export default NoteItem;