import React, { ReactElement } from 'react';
import { Box, Typography, Button } from '@mui/material';

function ProfileComponentLeft():ReactElement {
  return (
    <Box p={3} sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      <Box sx={{maxWidth: '250px'}}>
        <img width={'100%'} alt="UserAvatar" src="https://avatars.githubusercontent.com/u/38877564?v=4" />
      </Box>
      <Typography variant='h5' sx={{textAlign: 'center'}}>User Name</Typography>
      <Button color='inherit' variant='outlined'>Редактировать профиль</Button>
      <Button color='inherit' variant='contained'>Написать сообщение</Button>
    </Box>
  );
}

export default ProfileComponentLeft;