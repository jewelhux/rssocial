import { Box, Typography, TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { CustomGrid, CustomGridItem } from '../../../Common/CustomStyleComponents';

function SettingComponentNewInfo() {
  return (
    <>
      <TextField id="standard-basic" label="Возраст" variant="filled"/>
      <TextField id="standard-basic" label="Семейное положение" variant="filled"/>
      <TextField id="standard-basic" label="Интересы" variant="filled"/>
      <TextField id="standard-basic" label="Место работы" variant="filled"/>
    </>
  );
}

export default SettingComponentNewInfo;