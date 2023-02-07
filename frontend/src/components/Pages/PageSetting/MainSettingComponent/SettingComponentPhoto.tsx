import { Box, Button } from '@mui/material';

function SettingComponentPhoto() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '250px',
        margin: '0 auto'
      }}
    >
      <Button>Загрузить новое фото</Button>
      <Box sx={{ maxWidth: '250px' }}>
        <img
          width={'100%'}
          alt="UserAvatar"
          src="https://avatars.githubusercontent.com/u/38877564?v=4"
        />
      </Box>
    </Box>
  );
}

export default SettingComponentPhoto;
