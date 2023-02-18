import { useState } from 'react';
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
import HeaderComponentFriend from './HeaderComponent/HeaderComponentFriend';
import HeaderComponentSetting from './HeaderComponent/HeaderComponentSetting';
import HeaderComponentLogout from './HeaderComponent/HeaderComponentLogout';
import { useLoginCheckQuery } from '../../redux/features/service/authService';

export default function Header() {
  const { data: isLoggedIn } = useLoginCheckQuery();

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
      onClick={handleMobileMenuClose}
    >
      <HeaderComponentMessage title={'header.messages'} />
      <HeaderComponentProfile title={'header.profile'} />
      <HeaderComponentFriend title={'header.friends'} />
      <HeaderComponentSetting title={'header.settings'} />
      <HeaderComponentLogout title={'header.logout'} />
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static" sx={{ flexGrow: 1 }}>
        <Toolbar>
          {/* ЛОГОТИП */}
          <HeaderComponentLogo />

          {/* ПОИСК */}
          {isLoggedIn && <HeaderComponentSearch />}

          {/* БЛОК ДЛЯ ОТСТУПА */}
          <Box sx={{ flexGrow: 1 }} />

          {/* ВХОД И РЕГИСТРАЦИЯ */}
          {!isLoggedIn && <HeaderComponentLogin />}

          {/* СООБЩЕНИЯ И ПРОФИЛЬ */}
          {isLoggedIn && (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <HeaderComponentMessage />
                <HeaderComponentProfile />
                <HeaderComponentFriend />
                <HeaderComponentSetting />
                <HeaderComponentLogout />
              </Box>
              {/* МЕНЮ ТРЕХ ТОЧЕК */}
              <HeaderComponentMobileMenu
                mobileMenuId={mobileMenuId}
                handleMobileMenuOpen={handleMobileMenuOpen}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
