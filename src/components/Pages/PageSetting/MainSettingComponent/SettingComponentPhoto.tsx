import { Box, Typography, TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { CustomGrid, CustomGridItem } from '../../../Common/CustomStyleComponents';

function SettingComponentPhoto() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '250px', margin: '0 auto' }}>
      <Button>Загрузить новое фото</Button>
      <Box sx={{maxWidth: '250px'}}>
        <img width={'100%'} alt="UserAvatar" src="https://avatars.githubusercontent.com/u/38877564?v=4" />
      </Box>
  </Box>
  );
}

export default SettingComponentPhoto;