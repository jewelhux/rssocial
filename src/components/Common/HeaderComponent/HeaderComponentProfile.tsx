import React, { ReactElement, ReactEventHandler, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import HeaderComponentMessage, { HeaderMails, HeaderAccount } from './HeaderComponentMessage';
import MailIcon from '@mui/icons-material/Mail';

// три точки вертикальные
function HeaderComponentProfile(): ReactElement {

  const [anchorElement, setAncrElement] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setAncrElement(null)
    setOpen(false)
  }
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAncrElement(event.currentTarget)
    setOpen(true)
  }

  return (
    <>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <IconButton
          onClick={handleOpen}
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"

        >
          <MoreIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        sx={{ display: { xs: 'flex', md: 'none', flexDirection: "column" } }}
      >
        <MenuItem >
          <HeaderMails />
          <Typography>
            Почта
          </Typography>
        </MenuItem>
        <MenuItem >
          <HeaderAccount />
          <Typography>
            Аккаунт
          </Typography>
        </MenuItem>
      </Menu>
    </>

  );
}

export default HeaderComponentProfile;