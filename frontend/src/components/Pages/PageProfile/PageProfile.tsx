import { Container, Divider, Typography, Box } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOwnPostsQuery } from '../../../redux/features/service/postsService';
import { UserPost } from '../../../redux/features/service/types';
import ProfileComponentFeed from './MainProfileComponent/ProfileComponentFeed';
import ProfileComponentInputFeed from './MainProfileComponent/ProfileComponentInpitFeed';
import ProfileComponentMainInfo from './MainProfileComponent/ProfileComponentMainInfo';
import ProfileComponentSecondaryInfo from './MainProfileComponent/ProfileComponentSecondaryInfo';

function PageProfile(): ReactElement {
  const { data } = useGetOwnPostsQuery();
  const { t } = useTranslation();

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
            <Typography>{t('profileLng.feedUser')}:</Typography>
            <ProfileComponentInputFeed />
          </Box>

          <Box
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', alignSelf: 'center' }}
          >
            {data?.posts.map((post: UserPost) => (
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
