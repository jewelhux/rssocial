import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';

function HeaderComponentMessage():ReactElement {
  return (
    <IconButton size="large" aria-label="new messages" color="inherit">
      <Badge badgeContent={69} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}

export default HeaderComponentMessage;