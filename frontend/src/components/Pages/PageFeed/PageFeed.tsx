import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetAllPostsQuery } from '../../../redux/features/service/postsService';
import FeedComponentFeed from './MainFeedComponent/FeedComponentFeed';

function PageFeed() {
  const { data } = useGetAllPostsQuery();
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
      <Typography variant="h5">{t('feedLng.title')}</Typography>
      <Typography>{t('feedLng.lastpost')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {data?.posts.map((post) => (
          <FeedComponentFeed key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
}

export default PageFeed;
