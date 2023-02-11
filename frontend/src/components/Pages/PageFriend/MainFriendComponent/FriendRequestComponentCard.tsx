import { Typography, Button, CardMedia, Card, Box } from '@mui/material';
import { FriendProfile, FriendRequestActions } from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { CustomButtinListFriend } from '../../../Common/CustomStyleComponents';
import { Link } from 'react-router-dom';
import { useFriendRequestMutation } from '../../../../redux/features/service/friendsService';

function FriendRequestComponentCard({ prop, index }: { prop: FriendProfile; index: number }) {
  const [friendRequestMutation] = useFriendRequestMutation();

  const handleAddFreind = (id: number) => {
    friendRequestMutation({
      id: id,
      action: FriendRequestActions.approve
    });
  };

  const handleDeleteRequestFreind = (id: number) => {
    friendRequestMutation({
      id: id,
      action: FriendRequestActions.delete
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        ml: index % 2 === 0 ? 1 : 0,
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
          image={prop.avatar || DEFAULT_IMAGE}
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
        >{`${prop.name} ${prop.lastname}`}</Typography>
        <Typography gutterBottom>{`Возраст: ${prop.about.age || 'не указан'}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', mt: 1, width: '30%', flexDirection: 'column' }}>
        <Typography gutterBottom>{`Место работы: ${prop.about.work || 'не указано'}`}</Typography>
        <Typography gutterBottom>{`Интересы: ${prop.about.interests || 'не указаны'}`}</Typography>
      </Box>
      <CustomButtinListFriend>
        <Button component={Link} to={`/profile/${prop.id}`} size="small">
          Профиль
        </Button>
        <Button size="small" onClick={() => handleAddFreind(prop.id)}>
          Принять
        </Button>
        <Button size="small" onClick={() => handleDeleteRequestFreind(prop.id)}>
          Отклонить
        </Button>
      </CustomButtinListFriend>
    </Card>
  );
}

export default FriendRequestComponentCard;
