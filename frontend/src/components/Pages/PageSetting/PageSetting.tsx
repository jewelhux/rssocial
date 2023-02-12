import { Box, Container } from '@mui/material';
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <SettingComponentNewInfo />
      </Box>
    </Container>
  );
}

export default PageSetting;
