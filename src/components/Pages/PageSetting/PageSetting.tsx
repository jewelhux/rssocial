import { Box, Typography, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { CustomGrid, CustomGridItem } from '../../Common/CustomStyleComponents';

function PageSetting() {
  return (
    <Container sx={{ mb: 2, mt: 6, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <CustomGrid sx={{ maxWidth: 600, alignSelf: 'center', gridTemplateColumns: { xs:'repeat(1, 1fr)', md: 'repeat(2, 1fr)'} }} >
          <CustomGridItem variant="outlined"><b>Возраст:</b> 25</CustomGridItem>
          <CustomGridItem variant="outlined"><b>Семейное положение:</b> Не женат</CustomGridItem>
          <CustomGridItem variant="outlined"><b>Интересы:</b> Дота, Мейби Бейби, Программирование</CustomGridItem>
          <CustomGridItem variant="outlined"><b>Место работы:</b> Кассир Вкусно и Точка</CustomGridItem>
        </CustomGrid>

        <TextField id="standard-basic" label="Standard" variant="standard" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
    </Container>
  );
}

export default PageSetting;