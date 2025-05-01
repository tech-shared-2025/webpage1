import React, { useContext, useState, useEffect } from 'react';
import { Box, TextField, Paper } from '@mui/material';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { NotesContext } from '../contexts/NotesContext';
import EditorToolbar from './EditorToolbar';

const Editor = () => {
  const { currentNote, updateNote } = useContext(NotesContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  
  // Autosave timer
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize editor with content when note changes
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      
      if (currentNote.content) {
        try {
          const contentState = convertFromRaw(JSON.parse(currentNote.content));
          setEditorState(EditorState.createWithContent(contentState));
        } catch (e) {
          // If content is not valid JSON or not in Draft.js format
          const contentState = ContentState.createFromText(currentNote.content || '');
          setEditorState(EditorState.createWithContent(contentState));
        }
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [currentNote?.id]);

  // Handle content changes with debounced autosave
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    
    setSaveTimeout(
      setTimeout(() => {
        if (currentNote) {
          setIsSaving(true);
          const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
          updateNote(currentNote.id, { content });
          setTimeout(() => setIsSaving(false), 1000);
        }
      }, 1000)
    );
  };

  // Handle title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    
    setSaveTimeout(
      setTimeout(() => {
        if (currentNote) {
          setIsSaving(true);
          updateNote(currentNote.id, { title: newTitle });
          setTimeout(() => setIsSaving(false), 1000);
        }
      }, 1000)
    );
  };

  if (!currentNote) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Note Title"
        value={title}
        onChange={handleTitleChange}
        sx={{ 
          mb: 2,
          '& .MuiInputBase-input': {
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
          '& .MuiInput-underline:before': {
            borderBottom: 'none',
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
          },
        }}
      />
      
      <Paper 
        variant="outlined" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <DraftEditor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline'],
            },
            blockType: {
              options: ['Normal', 'H1', 'H2', 'H3'],
            },
            list: {
              options: ['unordered', 'ordered'],
            },
          }}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
        />
      </Paper>
      
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <EditorToolbar isSaving={isSaving} />
      </Box>
    </Box>
  );
};

export default Editor;