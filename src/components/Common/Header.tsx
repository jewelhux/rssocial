import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar} from '@mui/material';
import HeaderComponentSearch from './HeaderComponent/HeaderComponentSearch';
import HeaderComponentLogo from './HeaderComponent/HeaderComponentLogo';
import HeaderComponentMessage from './HeaderComponent/HeaderComponentMessage';
import HeaderComponentProfile from './HeaderComponent/HeaderComponentProfile';


function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <HeaderComponentLogo />

          <HeaderComponentSearch />

          <Box sx={{ flexGrow: 1 }} />

          <HeaderComponentMessage />

          <HeaderComponentProfile />
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;