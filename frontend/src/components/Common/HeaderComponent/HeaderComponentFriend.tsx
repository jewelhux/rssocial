import { ReactElement } from 'react';
import { Badge, Box, MenuItem } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useTranslation } from 'react-i18next';
import { useLoginCheckQuery } from '../../../redux/features/service/authService';
import { useGetFriendsQuery } from '../../../redux/features/service/friendsService';
import { FriendStatus } from '../../../redux/features/service/types';

function HeaderComponentFriend({ title }: IHeaderLink): ReactElement {
  const { data: isLoggedIn } = useLoginCheckQuery();
  const { currentData } = useGetFriendsQuery(FriendStatus.pending, { skip: !isLoggedIn });
  const { t } = useTranslation();
  return (
    <MenuItem
      component={Link}
      to="/friend"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge badgeContent={currentData?.friends.length ?? 0} color="error">
          <PeopleIcon />
        </Badge>
      </Box>
      {title && <p>{t(title)}</p>}
    </MenuItem>
  );
}

export default HeaderComponentFriend;
