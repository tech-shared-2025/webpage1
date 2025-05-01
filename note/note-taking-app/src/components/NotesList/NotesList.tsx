import React, { useContext } from 'react';
import { List, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoteItem from './NoteItem';
import { NotesContext } from '../contexts/NotesContext';

const NotesList = () => {
  const { notes, createNote } = useContext(NotesContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Notes</Typography>
        <Button 
          startIcon={<AddIcon />}
          onClick={createNote}
          size="small"
          variant="contained"
        >
          New
        </Button>
      </Box>
      
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {notes.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
        {notes.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              No notes yet. Create your first note!
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default NotesList;