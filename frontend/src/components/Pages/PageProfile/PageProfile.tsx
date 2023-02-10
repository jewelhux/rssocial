import { Container, Divider, Typography, Box } from '@mui/material';
import { ReactElement } from 'react';
import { useGetOwnPostsQuery } from '../../../redux/features/service/postsService';
import ProfileComponentFeed from './MainProfileComponent/ProfileComponentFeed';
import ProfileComponentInputFeed from './MainProfileComponent/ProfileComponentInpitFeed';
import ProfileComponentMainInfo from './MainProfileComponent/ProfileComponentMainInfo';
import ProfileComponentSecondaryInfo from './MainProfileComponent/ProfileComponentSecondaryInfo';

function PageProfile(): ReactElement {
  const { data } = useGetOwnPostsQuery();

  return (
    <Container sx={{ mb: 2, mt: 6, flexGrow: 1, padding: { xs: '0', md: '0 10px' } }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Divider flexItem orientation="vertical" />
        <ProfileComponentMainInfo />
        <Divider flexItem orientation="vertical" />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '75%',
            rowGap: '20px',
            padding: { xs: '0', md: '0 15px' }
          }}
        >
          <ProfileComponentSecondaryInfo />

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '50px'
            }}
          >
            <Typography>Лента новостей пользователя:</Typography>
            <ProfileComponentInputFeed />
          </Box>

          <Box
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', alignSelf: 'center' }}
          >
            {data?.posts.map((post) => (
              <ProfileComponentFeed key={post.id} post={post} />
            ))}
          </Box>
        </Box>
        <Divider flexItem orientation="vertical" />
      </Box>
    </Container>
  );
}

export default PageProfile;
