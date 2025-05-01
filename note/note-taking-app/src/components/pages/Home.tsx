import React, { useContext } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import Editor from '../editor/Editor';
import Header from '../UI/Header';
import Sidebar from '../UI/Sidebar';

import { NotesContext } from '../contexts/NotesContext';

const Home = () => {
  const { currentNote } = useContext(NotesContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid item xs={12} md={3} lg={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              borderRadius: 0,
              padding: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {currentNote ? (
              <Editor />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                Select a note or create a new one to start editing
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;