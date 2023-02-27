import { ReactElement } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { useLogoutMutation } from '../../../../redux/features/service/authService';
import { useTranslation } from 'react-i18next';
import { FriendRequestActions, FriendStatus } from '../../../../redux/features/service/types';
import { useFriendRequestMutation } from '../../../../redux/features/service/friendsService';
import { useSnackbar } from 'notistack';

function ProfileComponentMainInfo({ id }: { id?: string }): ReactElement {
  const { data: profile } = useGetProfileQuery(id);
  const [logoutUser] = useLogoutMutation();
  const [friendRequest] = useFriendRequestMutation();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const approve = (profileId: string) =>
    friendRequest({ id: profileId, action: FriendRequestActions.approve });
  const request = (profileId: string) =>
    friendRequest({ id: profileId, action: FriendRequestActions.request });
  const remove = (profileId: string) =>
    friendRequest({ id: profileId, action: FriendRequestActions.delete });

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
        <img
          width={'100%'}
          height={'100%'}
          alt="UserAvatar"
          style={{ objectFit: 'cover' }}
          src={profile?.avatar || DEFAULT_IMAGE}
        />
      </Box>
      <Typography variant="h5" sx={{ textAlign: 'center', width: '100%' }}>
        {profile && `${profile?.name} ${profile.lastname}`}
      </Typography>
      {profile?.isOwn ? (
        <>
          <Button component={Link} to="/friend" color="inherit" variant="outlined">
            {t('profileLng.btnFriend')}
          </Button>
          <Button component={Link} to="/setting" color="inherit" variant="outlined">
            {t('profileLng.btnSetting')}
          </Button>
          <Button component={Link} to="/messages" variant="contained">
            {t('profileLng.btnMyMessages')}
          </Button>
          <Button
            component={Link}
            to="/auth"
            color="inherit"
            variant="outlined"
            onClick={() =>
              logoutUser()
                .unwrap()
                .then(() => enqueueSnackbar(t('snacks.logout'), { variant: 'success' }))
                .catch(() => {})
            }
          >
            {t('profileLng.btnOut')}
          </Button>
        </>
      ) : (
        <>
          <Button
            component={Link}
            to="/messages"
            variant="contained"
            state={{ profile: profile?.id }}
          >
            {t('profileLng.btnMessage')}
          </Button>
          {profile?.friendStatus === FriendStatus.none ? (
            <Button variant="outlined" onClick={() => request(profile.id)}>
              {t('friendLng.btnRequest')}
            </Button>
          ) : profile?.friendStatus === FriendStatus.pending ? (
            <>
              <Button variant="outlined" onClick={() => approve(profile.id)}>
                {t('friendLng.btnRequest')}
              </Button>
              <Button variant="outlined" onClick={() => remove(profile.id)}>
                {t('friendLng.btnReject')}
              </Button>
            </>
          ) : profile?.friendStatus === FriendStatus.requested ? (
            <Button variant="outlined" onClick={() => remove(profile.id)}>
              {t('friendLng.btnRevoke')}
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => profile && remove(profile.id)}>
              {t('friendLng.btnDelete')}
            </Button>
          )}
        </>
      )}
    </Box>
  );
}

export default ProfileComponentMainInfo;
