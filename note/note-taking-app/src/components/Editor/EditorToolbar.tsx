import React from 'react';
import { Box, Typography } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface EditorToolbarProps {
  isSaving: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ isSaving }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isSaving ? (
        <>
          <SaveIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Saving...
          </Typography>
        </>
      ) : (
        <Typography variant="caption" color="text.secondary">
          All changes saved
        </Typography>
      )}
    </Box>
  );
};

export default EditorToolbar;