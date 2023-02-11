import { Box } from '@mui/material';
import FriendComponentCard from './MainFriendComponent/FriendComponentCard';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetFriendsQuery } from '../../../redux/features/service/friendsService';
import { FriendStatus } from '../../../redux/features/service/types';

function PageFriend() {
  const [tabName, setTabName] = useState<FriendStatus>(FriendStatus.accepted);

  const handleChange = (event: React.SyntheticEvent, newtabName: FriendStatus) => {
    setTabName(newtabName);
  };

  const { currentData, isError } = useGetFriendsQuery(tabName);

  return (
    <Box sx={{ width: '100%', typography: 'body1', flexGrow: 1 }}>
      <TabContext value={tabName}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Мои друзья" value={FriendStatus.accepted} />
            <Tab label="Заявки в друзья" value={FriendStatus.pending} />
          </TabList>
        </Box>
        <TabPanel
          value={tabName}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {!currentData && !isError ? (
            <CircularProgress />
          ) : currentData?.friends.length ? (
            currentData.friends.map((friend) => (
              <FriendComponentCard key={friend.id} friend={friend} status={tabName} />
            ))
          ) : (
            'Здесь пока пусто'
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default PageFriend;
