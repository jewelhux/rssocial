import { Box, Container, Typography } from '@mui/material';
import SettingComponentLng from './MainSettingComponent/SettingComponentLng';
import SettingComponentNewInfo from './MainSettingComponent/SettingComponentNewInfo';

function PageSetting() {
  return (
    <Container
      sx={{
        mb: 2,
        mt: 6,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography>Системные настрйоки:</Typography>
        <SettingComponentLng />
        <Typography>Личные данные:</Typography>
        <SettingComponentNewInfo />
      </Box>
    </Container>
  );
}

export default PageSetting;
