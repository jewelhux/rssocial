import { useState, Dispatch, SetStateAction } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import HeaderComponentSearch from './HeaderComponent/HeaderComponentSearch';
import HeaderComponentLogin from './HeaderComponent/HeaderComponentLogin';
import HeaderComponentLogo from './HeaderComponent/HeaderComponentLogo';
import HeaderComponentMobileMenu from './HeaderComponent/HeaderComponentMobileMenu';
import HeaderComponentProfile from './HeaderComponent/HeaderComponentProfile';
import HeaderComponentMessage from './HeaderComponent/HeaderComponentMessage';
import Switch from '@mui/material/Switch';
import HeaderComponentFriend from './HeaderComponent/HeaderComponentFriend';
import HeaderComponentSetting from './HeaderComponent/HeaderComponentSetting';

type ModeDark = 'light' | 'dark';

export default function Header({
  modeDark,
  setmodeDark
}: {
  modeDark: ModeDark;
  setmodeDark: Dispatch<SetStateAction<ModeDark>>;
}) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

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
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <HeaderComponentMessage title={'Messages'} />
      <HeaderComponentProfile title={'Profile'} />
      <HeaderComponentFriend title={'Friend'} />
      <HeaderComponentSetting title={'Setting'} />
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

          <Switch onChange={() => setmodeDark(modeDark === 'light' ? 'dark' : 'light')} />
          {/* ВХОД И РЕГИСТРАЦИЯ */}
          <HeaderComponentLogin />

          {/* СООБЩЕНИЯ И ПРОФИЛЬ */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <HeaderComponentMessage />
            <HeaderComponentProfile />
            <HeaderComponentFriend />
            <HeaderComponentSetting />
          </Box>

          {/* МЕНЮ ТРЕХ ТОЧЕК */}
          <HeaderComponentMobileMenu
            mobileMenuId={mobileMenuId}
            handleMobileMenuOpen={handleMobileMenuOpen}
          />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
