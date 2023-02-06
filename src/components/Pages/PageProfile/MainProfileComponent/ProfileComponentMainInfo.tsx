import React, { ReactElement } from 'react';
import { Box, Typography, Button } from '@mui/material';

function ProfileComponentMainInfo():ReactElement {
  return (
    <Box p={3} sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px', maxWidth: '320px', flexGrow: '1', alignSelf:{ xs:'center', md: 'flex-start'} }}>
      <Box sx={{maxWidth: '250px'}}>
        <img width={'100%'} alt="UserAvatar" src="https://avatars.githubusercontent.com/u/38877564?v=4" />
      </Box>
      <Typography variant='h5' sx={{textAlign: 'center', width: '100%'}}>User Name</Typography>
      <Button color='inherit' variant='outlined'>Изменить профиль</Button>
      <Button color='info' variant='contained'>Написать сообщение</Button>
      <Button color='inherit' variant='outlined'>Выход</Button>
    </Box>
  );
}

export default ProfileComponentMainInfo;