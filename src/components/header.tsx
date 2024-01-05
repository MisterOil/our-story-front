import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FileUpload from './fileupload';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3" component="div" sx={{ fontFamily:  'Schoolbell, cursive' }}>
          Our Story
        </Typography>
        {/* Add additional buttons or components on the right side if needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
