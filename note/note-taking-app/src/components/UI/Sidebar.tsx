import React from 'react';
import { Box, Paper } from '@mui/material';
import NotesList from '../NotesList/NotesList';

const Sidebar = () => {
  return (
    <Paper 
      sx={{ 
        height: '100%', 
        borderRadius: 0,
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={0}
    >
      <NotesList />
    </Box>
  );
};

export default Sidebar;