import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';


export function HeaderMails() {
  return (
    <>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
    </>
  );
}

export function HeaderAccount() {
  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
    >
        <AccountCircle />
      </IconButton>
    </>
  );
}


function HeaderComponentMessage():ReactElement {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <HeaderMails />
      <HeaderAccount />
    </Box>
  );
}

export default HeaderComponentMessage;