import { Container, Box } from '@mui/material';
import FriendComponentCard from './MainFriendComponent/FriendComponentCard';

function PageFriend() {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
        <FriendComponentCard />
      </Box>
    </Container>
  );
}

export default PageFriend;
