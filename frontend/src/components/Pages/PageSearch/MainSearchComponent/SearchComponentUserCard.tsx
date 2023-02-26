import { Typography, Button, CardMedia, Card, Box } from '@mui/material';
import { FriendProfile } from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { CustomButtinListFriend } from '../../../Common/CustomStyleComponents';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SearchComponentUserCard({ user }: { user: FriendProfile }) {
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
          image={user.avatar || DEFAULT_IMAGE}
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
        >{`${user.name} ${user.lastname}`}</Typography>
        <Typography gutterBottom>{`${t('friendLng.infoAge')}: ${
          user.age || t('friendLng.hidden')
        }`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', mt: 1, width: '30%', flexDirection: 'column' }}>
        <Typography gutterBottom>{`${t('friendLng.infoJob')}: ${
          user.work || t('friendLng.hidden')
        }`}</Typography>
        <Typography gutterBottom>{`${t('friendLng.infoInterests')}: ${
          user.interests || t('friendLng.hidden')
        }`}</Typography>
      </Box>
      <CustomButtinListFriend>
        <Button size="small" component={Link} to={`/profile/${user.id}`}>
          {t('friendLng.btnProfile')}
        </Button>
        <Button size="small" component={Link} to={'/messages'} state={{ profile: user.id }}>
          {t('friendLng.btnMessage')}
        </Button>
      </CustomButtinListFriend>
    </Card>
  );
}

export default SearchComponentUserCard;
