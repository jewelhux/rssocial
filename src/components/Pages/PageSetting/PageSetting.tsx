import { Box, Typography, TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { CustomGrid, CustomGridItem } from '../../Common/CustomStyleComponents';
import SettingComponentOldInfo from './MainSettingComponent/SettingComponentOldInfo';
import SettingComponentNewInfo from './MainSettingComponent/SettingComponentNewInfo';
import SettingComponentPhoto from './MainSettingComponent/SettingComponentPhoto';

function PageSetting() {
  return (
    <Container sx={{ mb: 2, mt: 6, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <SettingComponentOldInfo />

        <SettingComponentNewInfo />

        <SettingComponentPhoto />

        <Button variant='outlined'>Сохранить настройки</Button>
      </Box>
    </Container>
  );
}

export default PageSetting;