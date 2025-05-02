import React, { useState } from 'react';
import { Trash2, Edit, Save, Plus } from 'lucide-react';
import { useNotes } from '../../contexts/NotesContext';
import FormatToolbar from '../common/FormatToolbar';
import renderMarkdown from '../../utils/markdown';

const NoteEditor = () => {
  const { 
    currentNote, 
    setCurrentNote, 
    editMode, 
    setEditMode, 
    handleSaveNote, 
    handleDeleteNote, 
    handleCreateNewNote,
    formatDate 
  } = useNotes();
  
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  
  const handleFormat = (format) => {
    if (!editMode) return;
    
    const textarea = document.getElementById('note-content');
    if (!textarea) return;
    
    // Save the current selection
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = currentNote.content.substring(start, end);
    
    let formattedText = '';
    let cursorPosition = start;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = start + 1;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        cursorPosition = start + 2;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        cursorPosition = start + 3;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        cursorPosition = start + 4;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        cursorPosition = end + selectedText.split('\n').length * 2;
        break;
      default:
        return;
    }
    
    const newContent = 
      currentNote.content.substring(0, start) + 
      formattedText + 
      currentNote.content.substring(end);
    
    setCurrentNote({...currentNote, content: newContent});
    
    // After state update, restore focus and selection
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.selectionStart = start;
        textarea.selectionEnd = start + formattedText.length;
      } else {
        textarea.selectionStart = cursorPosition;
        textarea.selectionEnd = cursorPosition;
      }
    }, 0);
  };
  
  return (
    <>
      {currentNote.id ? (
        <>
          {/* Note Header */}
          <div className="main-header">
            {editMode ? (
              <input
                type="text"
                className="note-title-input"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                placeholder="Note title"
              />
            ) : (
              <h2 className="note-title">{currentNote.title}</h2>
            )}
            
            <div className="header-actions">
              {editMode ? (
                <button 
                  className="icon-button save"
                  onClick={handleSaveNote}
                  title="Save note"
                >
                  <Save size={20} />
                </button>
              ) : (
                <button 
                  className="icon-button edit"
                  onClick={() => setEditMode(true)}
                  title="Edit note"
                >
                  <Edit size={20} />
                </button>
              )}
              
              <button 
                className="icon-button delete"
                onClick={() => handleDeleteNote(currentNote.id)}
                title="Delete note"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Formatting Toolbar */}
          {editMode && <FormatToolbar handleFormat={handleFormat} />}
          
          {/* Note Content */}
          <div className="note-content">
            {editMode ? (
              <textarea
                id="note-content"
                className="note-textarea"
                value={currentNote.content}
                onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                onSelect={(e) => {
                  setSelectionStart(e.target.selectionStart);
                  setSelectionEnd(e.target.selectionEnd);
                }}
                placeholder="Write your note here..."
              />
            ) : (
              <div className="note-preview markdown-content">
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(currentNote.content) }} />
              </div>
            )}
          </div>
          
          {/* Note Footer */}
          <div className="note-footer">
            Last edited: {formatDate(currentNote.lastEdited)}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p className="empty-state-message">Select a note or create a new one</p>
          <button 
            className="new-note-button"
            onClick={handleCreateNewNote}
          >
            <Plus size={16} className="mr-1" />
            New Note
          </button>
        </div>
      )}
    </>
  );
};

export default NoteEditor;