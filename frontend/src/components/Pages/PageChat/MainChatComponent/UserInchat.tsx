import { ReactElement } from 'react';
import { Avatar, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { StyledBadge } from '../../../Common/CustomStyleComponents';
import { DataOfUsers } from '../../../../utils/Type';

function UserInChat(props: { dataOfUsers: DataOfUsers }): ReactElement {
  const { dataOfUsers } = props;

  const theme = useTheme();

  const isMatchMoreScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <ListItem sx={{ cursor: 'pointer' }}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          isonlineuser={dataOfUsers.isOnlineUser.toString()}
        >
          <Avatar alt="image" src={dataOfUsers.imgOfUser} />
        </StyledBadge>
        {isMatchMoreScreen && <ListItemText>{dataOfUsers.nameOfUser}</ListItemText>}
      </ListItem>
    </>
  );
}

export default UserInChat;
