import { Typography, Button, CardMedia, Card, Box } from '@mui/material';
import {
  FriendProfile,
  FriendRequestActions,
  FriendStatus
} from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { CustomButtinListFriend } from '../../../Common/CustomStyleComponents';
import { Link } from 'react-router-dom';
import { useFriendRequestMutation } from '../../../../redux/features/service/friendsService';
import { useTranslation } from 'react-i18next';

function FriendComponentCard({ friend, status }: { friend: FriendProfile; status: FriendStatus }) {
  const [friendRequest, { isLoading, isSuccess }] = useFriendRequestMutation();
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        width: '100%',
        gap: '1%',
        alignItems: 'centers',
        marginBottom: '5px',
        flexWrap: 'wrap',
        padding: 1,
        justifyContent: 'space-between'
      }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ maxWidth: '140px', flexGrow: '1' }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={friend.avatar || DEFAULT_IMAGE}
          sx={{
            objectPosition: 'top',
            objectFit: 'contain',
            alignSelf: 'center',
            width: '120px'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', mt: 1, width: '30%', flexDirection: 'column' }}>
        <Typography
          gutterBottom
          sx={{ fontWeight: 600 }}
        >{`${friend.name} ${friend.lastname}`}</Typography>
        <Typography gutterBottom>{`${t('friendLng.infoAge')}: ${
          friend.about.age || t('friendLng.hidden')
        }`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', mt: 1, width: '30%', flexDirection: 'column' }}>
        <Typography gutterBottom>{`${t('friendLng.infoJob')}: ${
          friend.about.work || t('friendLng.hidden')
        }`}</Typography>
        <Typography gutterBottom>{`${t('friendLng.infoInterests')}: ${
          friend.about.interests || t('friendLng.hidden')
        }`}</Typography>
      </Box>
      <CustomButtinListFriend>
        <Button size="small" component={Link} to={`/profile/${friend.id}`}>
          {t('friendLng.btnProfile')}
        </Button>
        {status === FriendStatus.accepted ? (
          <Button size="small" component={Link} to={`/messages`} state={{ profile: friend.id }}>
            {t('friendLng.btnMessage')}
          </Button>
        ) : (
          <Button
            disabled={isLoading || isSuccess}
            size="small"
            onClick={() => friendRequest({ id: friend.id, action: FriendRequestActions.approve })}
          >
            {t('friendLng.btnAdd')}
          </Button>
        )}
        <Button
          disabled={isLoading || isSuccess}
          size="small"
          onClick={() => friendRequest({ id: friend.id, action: FriendRequestActions.delete })}
        >
          {status === FriendStatus.accepted ? t('friendLng.btnDelete') : t('friendLng.btnReject')}
        </Button>
      </CustomButtinListFriend>
    </Card>
  );
}

export default FriendComponentCard;
