import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

function PageSetting() {
  return (
    <Container sx={{ mb: 2, mt: 6, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        Настройки
      </Box>
    </Container>
  );
}

export default PageSetting;