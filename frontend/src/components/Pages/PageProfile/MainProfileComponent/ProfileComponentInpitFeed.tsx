import { TextField, Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { CustomCreatePost } from '../../../Common/CustomStyleComponents';
import DownloadIcon from '@mui/icons-material/Download';

function ProfileComponentInputFeed() {
  return (
    <CustomCreatePost sx={{ flexDirection: { xs: 'column' } }}>
      <TextField
        multiline
        rows={2}
        id="outlined-basic"
        label="Ваше сообщение..."
        variant="outlined"
        sx={{ flexGrow: '1', width: { xs: '240px', sm: '100%' } }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IconButton>
          <DownloadIcon />
        </IconButton>
        <Button variant="outlined">Отправить пост</Button>
      </Box>
    </CustomCreatePost>
  );
}

export default ProfileComponentInputFeed;
