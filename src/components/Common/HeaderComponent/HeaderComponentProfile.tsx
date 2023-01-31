import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

function HeaderComponentProfile():ReactElement {
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="show more"
        aria-haspopup="true"
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </Box>
  );
}

export default HeaderComponentProfile;