import { Box, Typography, Container } from '@mui/material';
import FeedComponentFeed from './MainFeedComponent/FeedComponentFeed';

function PageFeed() {
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
      <Typography variant="h5">Добро пожаловаьть в социальную сеть RSSocial</Typography>
      <Typography>Последние посты пользователей:</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <FeedComponentFeed />
        <FeedComponentFeed />
        <FeedComponentFeed />
        <FeedComponentFeed />
      </Box>
    </Container>
  );
}

export default PageFeed;
