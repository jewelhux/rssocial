import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HeaderComponentSearch from './HeaderComponent/HeaderComponentSearch';
import HeaderComponentLogin from './HeaderComponent/HeaderComponentLogin';
import HeaderComponentLogo from './HeaderComponent/HeaderComponentLogo';
import HeaderComponentMobileMenu from './HeaderComponent/HeaderComponentMobileMenu';
import HeaderComponentProfile from './HeaderComponent/HeaderComponentProfile';
import HeaderComponentMessage from './HeaderComponent/HeaderComponentMessage';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { Dispatch, SetStateAction } from 'react';

 type ModeDark = 'light' | 'dark'

export default function Header({ modeDark, setmodeDark }: {
  modeDark: ModeDark;
  setmodeDark: Dispatch<SetStateAction<ModeDark>>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
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
      <HeaderComponentMessage title={'Messages'} />
      <HeaderComponentProfile title={'Profile'} />

    </Menu>
  );

  return (
    <Box>
      <AppBar position="static" sx={{ flexGrow: 1 }}>
        <Toolbar>

          {/* ЛОГОТИП */}
          <HeaderComponentLogo />

          {/* ПОИСК */}
          <HeaderComponentSearch />

          {/* БЛОК ДЛЯ ОТСТУПА */}
          <Box sx={{ flexGrow: 1 }} />

          <Switch onChange={e => setmodeDark(modeDark === 'light' ? 'dark' : 'light')} />
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