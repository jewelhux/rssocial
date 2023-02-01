import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HeaderComponentSearch from './HeaderComponent/HeaderComponentSearch';
import HeaderComponentLogin from './HeaderComponent/HeaderComponentLogin';
import HeaderComponentLogo from './HeaderComponent/HeaderComponentLogo';
import HeaderComponentMobileMenu from './HeaderComponent/HeaderComponentMobileMenu';
import HeaderComponentProfile from './HeaderComponent/HeaderComponentProfile';
import HeaderComponentMessage from './HeaderComponent/HeaderComponentMessage';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <HeaderComponentMessage />
        <p>Messages</p>
      </MenuItem>
      
      <MenuItem>
        <HeaderComponentProfile />
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          {/* ЛОГОТИП */}
          <HeaderComponentLogo />

          {/* ПОИСК */}
          <HeaderComponentSearch />

          {/* БЛОК ДЛЯ ОТСТУПА */}
          <Box sx={{ flexGrow: 1 }} />

          {/* ВХОД И РЕГИСТРАЦИЯ */}
          <HeaderComponentLogin />

          {/* СООБЩЕНИЯ И ПРОФИЛЬ */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <HeaderComponentMessage />
            <HeaderComponentProfile />
          </Box>

          {/* МЕНЮ ТРЕХ ТОЧЕК */}
          <HeaderComponentMobileMenu mobileMenuId={mobileMenuId} handleMobileMenuOpen={handleMobileMenuOpen} />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}