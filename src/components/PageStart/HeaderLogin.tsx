import React, { ReactElement, useState } from 'react';
import { Toolbar, AppBar, Container, IconButton, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material'
import HeaderComponentSearch from '../Common/HeaderComponent/HeaderComponentSearch';
import HeaderComponentMessage from '../Common/HeaderComponent/HeaderComponentMessage';
import HeaderComponentProfile from '../Common/HeaderComponent/HeaderComponentProfile';

function HeaderLogin(): ReactElement {

const [detailsHeaderComponentUser, setDetailsHeaderComponentUser ] = useState(true)
const [detailsHeaderComponentSearch, setDetailsHeaderComponentSearch ] = useState(true)

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <Typography variant='h5' >RSSocial</Typography>
            {detailsHeaderComponentSearch &&
            <HeaderComponentSearch />
            }
          </Box>

          <Box sx={{ display: 'flex', columnGap: '10px' }}>
            <Button color='inherit' variant='outlined'>Вход</Button>
            <Button color='secondary' variant='contained'>Регистрация</Button>
          </Box>
          {detailsHeaderComponentUser &&

          <Box sx={{ display: 'flex', columnGap: '10px' }}>
            <HeaderComponentMessage />
            <HeaderComponentProfile />
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderLogin;