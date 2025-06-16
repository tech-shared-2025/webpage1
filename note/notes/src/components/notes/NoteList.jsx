import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useNotes } from '../../contexts/NotesContext';
import NoteItem from './NoteItem';

const NoteList = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredNotes, 
    handleCreateNewNote 
  } = useNotes();
  
  return (
    <>
      <div className="search-container">
        <FiSearch className="search-icon" size={16} />
        <input
          type="text"
          placeholder="Search notes..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Notes List */}
      <div className="notes-list-container">
        {filteredNotes.length === 0 ? (
          <div className="empty-list">
            <p className="empty-list-message">
              {searchTerm ? 'No matching notes' : 'No notes yet'}
            </p>
            <button 
              className="new-note-button"
              onClick={handleCreateNewNote}
            >
              <FiPlus size={16} />
              New Note
            </button>
          </div>
        ) : (
          <ul className="notes-list">
            {filteredNotes.map(note => (
              <NoteItem key={note.id} note={note} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default NoteList;