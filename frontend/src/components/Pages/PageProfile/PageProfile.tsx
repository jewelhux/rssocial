import { Container, Divider, Typography, Box, CircularProgress, Stack } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetUserPostsQuery } from '../../../redux/features/service/postsService';
import { useGetProfileQuery } from '../../../redux/features/service/profileService';
import ProfileComponentFeed from './MainProfileComponent/ProfileComponentFeed';
import ProfileComponentInputFeed from './MainProfileComponent/ProfileComponentInpitFeed';
import ProfileComponentMainInfo from './MainProfileComponent/ProfileComponentMainInfo';
import ProfileComponentSecondaryInfo from './MainProfileComponent/ProfileComponentSecondaryInfo';

function PageProfile(): ReactElement {
  const id = useParams().id;
  const { data: profile, isError, isLoading } = useGetProfileQuery(id);
  const { data } = useGetUserPostsQuery(id);
  const { t } = useTranslation();

  if (isLoading)
    return (
      <Stack flex={1} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  if (isError)
    return (
      <Stack flex={1} alignItems="center" justifyContent="center">
        <Typography variant="h5">{t('profileLng.noUser')}</Typography>
      </Stack>
    );

  return (
    <Container sx={{ mb: 2, mt: 6, flexGrow: 1, padding: { xs: '0', md: '0 10px' } }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Divider flexItem orientation="vertical" />
        <ProfileComponentMainInfo id={id} />
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
          <ProfileComponentSecondaryInfo id={id} />

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
            {profile?.isOwn && <ProfileComponentInputFeed />}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '15px',
              alignSelf: 'center',
              maxWidth: 600,
              width: '100%'
            }}
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
