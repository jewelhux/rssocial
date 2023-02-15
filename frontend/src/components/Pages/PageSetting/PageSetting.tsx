import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SettingComponentDarkTheme from './MainSettingComponent/SettingComponentDarkTheme';
import SettingComponentLng from './MainSettingComponent/SettingComponentLng';
import SettingComponentNewInfo from './MainSettingComponent/SettingComponentNewInfo';

function PageSetting() {
  const { t } = useTranslation();

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
        <Typography>{t('settingLng.chapterSystem')}:</Typography>
        <SettingComponentDarkTheme />
        <SettingComponentLng />
        <Typography>{t('settingLng.chapterHuman')}:</Typography>
        <SettingComponentNewInfo />
      </Box>
    </Container>
  );
}

export default PageSetting;
