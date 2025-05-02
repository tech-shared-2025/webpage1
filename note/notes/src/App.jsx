import React, { useState } from 'react';
import { NotesProvider } from './contexts/NotesContext';
import NoteList from './components/notes/NoteList';
import NoteEditor from './components/layout/NoteEditor';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <NotesProvider>
      <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">notes.app</h1>
            <div 
              className={`theme-toggle ${theme === 'dark' ? 'dark' : ''}`}
              onClick={toggleTheme}
            >
              <div className="theme-toggle-inner"></div>
            </div>
          </div>
          <NoteList />
        </div>
        <div className="main-content">
          <NoteEditor />
        </div>
      </div>
    </NotesProvider>
  );
};

export default App;