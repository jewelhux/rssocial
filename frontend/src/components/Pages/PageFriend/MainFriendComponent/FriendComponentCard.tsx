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

function FriendComponentCard({ friend, status }: { friend: FriendProfile; status: FriendStatus }) {
  const [friendRequest, { isLoading, isSuccess }] = useFriendRequestMutation();

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
        <Typography gutterBottom>{`Возраст: ${friend.about.age || 'скрыт'}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', mt: 1, width: '30%', flexDirection: 'column' }}>
        <Typography gutterBottom>{`Место работы: ${friend.about.work || 'скрыто'}`}</Typography>
        <Typography gutterBottom>{`Интересы: ${friend.about.interests || 'скрыты'}`}</Typography>
      </Box>
      <CustomButtinListFriend>
        <Button size="small" component={Link} to={`/profile/${friend.id}`}>
          Профиль
        </Button>
        {status === FriendStatus.accepted ? (
          <Button size="small" component={Link} to={`/messages`}>
            Написать
          </Button>
        ) : (
          <Button
            disabled={isLoading || isSuccess}
            size="small"
            onClick={() => friendRequest({ id: friend.id, action: FriendRequestActions.approve })}
          >
            Принять
          </Button>
        )}
        <Button
          disabled={isLoading || isSuccess}
          size="small"
          onClick={() => friendRequest({ id: friend.id, action: FriendRequestActions.delete })}
        >
          {status === FriendStatus.accepted ? 'Удалить' : 'Отклонить'}
        </Button>
      </CustomButtinListFriend>
    </Card>
  );
}

export default FriendComponentCard;
