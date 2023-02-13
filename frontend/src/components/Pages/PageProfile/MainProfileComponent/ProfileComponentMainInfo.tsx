import { ReactElement } from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetOwnProfileQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';

function ProfileComponentMainInfo(): ReactElement {
  const { data: user, isFetching, isLoading } = useGetOwnProfileQuery();

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
        {/* <Skeleton variant="circular" width={40} height={40} />
        <img width={'100%'} alt="UserAvatar" src={user?.avatar ?? DEFAULT_IMAGE} /> */}
      </Box>
      <Typography variant="h5" sx={{ textAlign: 'center', width: '100%' }}>
        {user && `${user?.name} ${user.lastname}`}
      </Typography>
      <Button component={Link} to="/friend" color="inherit" variant="outlined">
        Мои друзья
      </Button>
      <Button component={Link} to="/setting" color="inherit" variant="outlined">
        Настройки
      </Button>
      <Button color="info" variant="contained">
        Написать сообщение
      </Button>
      <Button color="inherit" variant="outlined">
        Выход
      </Button>
    </Box>
  );
}

export default ProfileComponentMainInfo;
