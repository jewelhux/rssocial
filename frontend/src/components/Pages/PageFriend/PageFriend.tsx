import { Box } from '@mui/material';
import FriendComponentCard from './MainFriendComponent/FriendComponentCard';

import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useGetFriendsQuery } from '../../../redux/features/service/friendsService';
import { FriendStatus } from '../../../redux/features/service/types';
import FriendRequestComponentCard from './MainFriendComponent/FriendRequestComponentCard';

function PageFriend() {
  const [valueTab, setValueTab] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValueTab: string) => {
    setValueTab(newValueTab);
  };

  const { data: dataFriendsPending, isLoading: isLoadingFriendsPending } = useGetFriendsQuery(
    FriendStatus.pending,
    {
      skip: valueTab === '1'
    }
  );
  const { data: dataFriendsAccepted, isLoading: isLoadingFriendsAccepted } = useGetFriendsQuery(
    FriendStatus.accepted,
    {
      skip: valueTab === '2'
    }
  );

  return (
    <Box sx={{ width: '100%', typography: 'body1', flexGrow: 1 }}>
      <TabContext value={valueTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Мои друзья" value="1" />
            <Tab label="Заявки в друзья" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {isLoadingFriendsAccepted
            ? 'Ищю друзей...'
            : dataFriendsAccepted?.friends.length
            ? dataFriendsAccepted?.friends.map((friend, index) => (
                <FriendComponentCard key={friend.id} prop={friend} index={index} />
              ))
            : 'Я сам себе лучший друг :)'}
        </TabPanel>
        <TabPanel value="2">
          {isLoadingFriendsPending
            ? 'Поиск новых друзей...'
            : dataFriendsPending?.friends.length
            ? dataFriendsPending?.friends.map((friend, index) => (
                <FriendRequestComponentCard key={friend.id} prop={friend} index={index} />
              ))
            : 'Я уже дружишу с лучшими людьми :)'}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default PageFriend;
