import { Box, Typography, Container } from '@mui/material';
import { useGetAllPostsQuery } from '../../../redux/features/service/postsService';
import FeedComponentFeed from './MainFeedComponent/FeedComponentFeed';

function PageFeed() {
  const { data } = useGetAllPostsQuery();

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
        {data?.posts.map((post) => (
          <FeedComponentFeed key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
}

export default PageFeed;
