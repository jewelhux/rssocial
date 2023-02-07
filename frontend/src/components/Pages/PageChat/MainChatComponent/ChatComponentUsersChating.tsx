import { ReactElement, useContext } from 'react';
import { List, Box } from '@mui/material';
import { Context } from '../../../Context/context';
import { DataOfUsers } from '../../../../utils/Type';
import UserInChat from './UserInchat';

function ChatComponentUsersChating(): ReactElement {
  const { isOpenUsers } = useContext(Context);

  const dataOfUsers: DataOfUsers[] = [
    {
      isOnlineUser: true,
      nameOfUser: 'JIK',
      imgOfUser: 'https://avatars.githubusercontent.com/u/38877564?v=4'
    },
    {
      isOnlineUser: false,
      nameOfUser: 'Ferka',
      imgOfUser: 'https://avatars.githubusercontent.com/u/74072987?v=4'
    },
    {
      isOnlineUser: true,
      nameOfUser: 'Syderi',
      imgOfUser: 'https://avatars.githubusercontent.com/u/107023048?v=4'
    }
  ];

  return (
    <Box
      sx={{ display: `${isOpenUsers ? 'flex' : 'none'}`, flexDirection: 'column', maxWidth: '30%' }}
    >
      <List sx={{ flexGrow: 1, overflowY: 'scroll', overflowX: 'hidden' }}>
        {dataOfUsers.map((user) => {
          return <UserInChat key={user.imgOfUser + user.nameOfUser} dataOfUsers={user} />;
        })}
      </List>
    </Box>
  );
}

export default ChatComponentUsersChating;
