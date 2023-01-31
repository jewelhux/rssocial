import React, { ReactElement } from 'react';
import { Toolbar, AppBar, Container, IconButton, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material'

function HeaderLogin():ReactElement {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant='h5' sx={{ flexGrow: 1 }}>RSSocial</Typography>
          <Box sx={{ display: 'flex', columnGap: '10px' }}>
            <Button color='inherit' variant='outlined'>Вход</Button>
            <Button color='secondary' variant='contained'>Регистрация</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderLogin;