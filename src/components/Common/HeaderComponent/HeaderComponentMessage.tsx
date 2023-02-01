import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

function HeaderComponentMessage():ReactElement {
  return (
    <IconButton component={Link} size="large" aria-label="new messages" color="inherit" to="/messages">
      <Badge badgeContent={69} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}

export default HeaderComponentMessage;