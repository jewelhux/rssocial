import { ReactElement } from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetOwnProfileQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { useLogoutMutation } from '../../../../redux/features/service/authService';
import { useTranslation } from 'react-i18next';

function ProfileComponentMainInfo(): ReactElement {
  const { data: user, isFetching, isLoading } = useGetOwnProfileQuery();
  const [logoutUser] = useLogoutMutation();
  const { t } = useTranslation();

  return (
    <Box
      p={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        maxWidth: '320px',
        flexGrow: '1',
        alignSelf: { xs: 'center', md: 'flex-start' }
      }}
    >
      <Box sx={{ maxWidth: '250px', height: '250px' }}>
        {isFetching || isLoading ? (
          <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
        ) : (
          <img
            width={'100%'}
            height={'100%'}
            alt="UserAvatar"
            style={{ objectFit: 'cover' }}
            src={user?.avatar ?? DEFAULT_IMAGE}
          />
        )}
      </Box>
      <Typography variant="h5" sx={{ textAlign: 'center', width: '100%' }}>
        {user && `${user?.name} ${user.lastname}`}
      </Typography>
      <Button component={Link} to="/friend" color="inherit" variant="outlined">
        {t('profileLng.btnFriend')}
      </Button>
      <Button component={Link} to="/setting" color="inherit" variant="outlined">
        {t('profileLng.btnSetting')}
      </Button>
      <Button color="info" variant="contained">
        {t('profileLng.btnMessage')}
      </Button>
      <Button
        component={Link}
        to="/auth"
        color="inherit"
        variant="outlined"
        onClick={() => logoutUser()}
      >
        {t('profileLng.btnOut')}
      </Button>
    </Box>
  );
}

export default ProfileComponentMainInfo;
