import React, { ReactElement } from 'react';
import { Box, Button } from '@mui/material';

function HeaderComponentLogin():ReactElement {
  return (
    <Box sx={{ display: 'flex', columnGap: '10px'}}>
      <Button color='inherit' variant='outlined'>Вход</Button>
      <Button color='secondary' variant='contained'>Регистрация</Button>
    </Box>
  );
}

export default HeaderComponentLogin;