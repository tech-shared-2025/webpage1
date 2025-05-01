import React, { useContext, useState } from 'react';
import { ListItem, ListItemText, ListItemButton, IconButton, Menu, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { MoreVert as MoreVertIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { NotesContext } from '../contexts/NotesContext';
import { Note } from '../models/Note';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { setCurrentNote, deleteNote, updateNote, currentNote } = useContext(NotesContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(note.id);
    handleMenuClose();
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewTitle(note.title);
    setRenameDialogOpen(true);
    handleMenuClose();
  };

  const handleRenameClose = () => {
    setRenameDialogOpen(false);
  };

  const handleRenameSave = () => {
    updateNote(note.id, { title: newTitle });
    setRenameDialogOpen(false);
  };

  return (
    <>
      <ListItem 
        disablePadding
        secondaryAction={
          <IconButton edge="end" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
      >
        <ListItemButton 
          selected={currentNote?.id === note.id}
          onClick={() => setCurrentNote(note.id)}
        >
          <ListItemText 
            primary={note.title} 
            secondary={new Date(note.updatedAt).toLocaleDateString()}
          />
        </ListItemButton>
      </ListItem>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRenameClick}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Rename
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={renameDialogOpen} onClose={handleRenameClose}>
        <DialogTitle>Rename Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note Title"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameClose}>Cancel</Button>
          <Button onClick={handleRenameSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteItem;