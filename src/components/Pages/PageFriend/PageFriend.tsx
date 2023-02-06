import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

function PageFriend() {
  return (
    <Container sx={{ mb: 2, mt: 6, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant='h5'>Добро пожаловаьть в социальную сеть RSSocial</Typography>
      <Typography>Последние посты пользователей:</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        123
      </Box>
    </Container>
  );
}

export default PageFriend;