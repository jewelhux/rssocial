import { Box } from '@mui/material';
import FriendComponentCard from './MainFriendComponent/FriendComponentCard';

import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useGetFriendsQuery } from '../../../redux/features/service/friendsService';
import { FriendStatus } from '../../../redux/features/service/types';

function PageFriend() {
  const { data: dataFriends } = useGetFriendsQuery(FriendStatus.accepted);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', flexGrow: 1 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Мои друзья" value="1" />
            <Tab label="Заявки в друзья" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {dataFriends?.friends.map((friend, index) => (
            <FriendComponentCard key={friend.id} prop={friend} index={index} />
          ))}
        </TabPanel>
        <TabPanel value="2"></TabPanel>
      </TabContext>
    </Box>
  );
}

export default PageFriend;
