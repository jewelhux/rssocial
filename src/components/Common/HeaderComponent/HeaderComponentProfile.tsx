import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

function HeaderComponentProfile():ReactElement {
  return (
    <IconButton
      component={Link}
      size="large"
      aria-label="account of current user"
      aria-controls="primary-search-account-menu"
      aria-haspopup="true"
      color="inherit"
      to="/profile"
    >
      <AccountCircle />
    </IconButton>
  );
}

export default HeaderComponentProfile;