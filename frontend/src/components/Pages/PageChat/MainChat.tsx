import { Container, Divider, Paper, Box } from '@mui/material';
import ChatComponentHeader from './MainChatComponent/ChatComponentHeader';
import ChatComponentDialogBox from './MainChatComponent/ChatComponentDialogBox';
import { ReactElement, useState } from 'react';
import { Context } from '../../Context/context';

function MainChat(): ReactElement {
  const [isOpenUsers, setisOpenUsers] = useState(true);

  return (
    <Context.Provider value={{ isOpenUsers, setisOpenUsers }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mb: 2,
          mt: 1,
          flexGrow: 1
        }}
      >
        <Paper elevation={8}>
          <Box p={1}>
            <ChatComponentHeader />
            <Divider />
            <ChatComponentDialogBox />
          </Box>
        </Paper>
      </Container>
    </Context.Provider>
  );
}

export default MainChat;
