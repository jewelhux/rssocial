import { ReactElement, useContext, useState } from 'react';
import { Avatar, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from "@mui/material";
import { StyledBadge } from '../../../Common/CustomStyleComponents'
import { Context } from '../../../Context/context'
import { DataOfUsers } from '../../../../utils/Type';

function UserInChat(props: { dataOfUsers: DataOfUsers }): ReactElement {
  const { dataOfUsers } = props;

  const theme = useTheme()

  const isMatchMoreScreen = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <>
          <ListItem sx={{ cursor: 'pointer' }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              isOnlineUser={dataOfUsers.isOnlineUser}
            >
              <Avatar alt="image" src={dataOfUsers.imgOfUser} />
            </StyledBadge>
            {isMatchMoreScreen && <ListItemText>{dataOfUsers.nameOfUser}</ListItemText>}

          </ListItem>
    </>
  );
}

export default UserInChat