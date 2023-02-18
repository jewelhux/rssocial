import ChatMessage from './MainChatComponent/ChatMessage';
import { styled } from '@mui/material/styles';
import type { Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useRef, useState } from 'react';
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useReportReadMutation
} from '../../../redux/features/service/chatService';
import ChatConversation from './MainChatComponent/ChatConversation';
import ChatSendForm from './MainChatComponent/ChatSendForm';
import { useLocation } from 'react-router-dom';
const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1)
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

function PageChat() {
  const [open, setOpen] = useState(window.innerWidth > 600 ? true : false);
  const location = useLocation();
  const [profile, setProfile] = useState<number>(location.state?.profile ?? -1);
  location.state = {};
  const { data: convData } = useGetConversationsQuery(profile === -1 ? undefined : profile);
  const { data: msgData } = useGetMessagesQuery(profile, { skip: profile === -1 });
  const [reportRead] = useReportReadMutation();
  const chatContainerRef = useRef<HTMLElement>(null);

  const handleConversationClick = (id: number) => {
    setProfile(id);
    if (open && window.innerWidth <= 600) setOpen(false);
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (convData && msgData && container) {
      const unreadCount = convData.conversations.find((el) => el.id === profile)?.unreadCount || 1;
      Array.from(container.children).at(-unreadCount)?.scrollIntoView();
      const handleScroll = () => {
        if (container.scrollTop >= container.scrollHeight - container.offsetHeight - 50) {
          container.removeEventListener('scroll', handleScroll);
          reportRead(profile);
        }
      };
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [msgData, convData, profile, reportRead]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: { xs: 'calc(100vh - 115px)', sm: 'calc(100vh - 130px)' },
        overflow: 'hidden'
      }}
    >
      <Drawer
        PaperProps={{
          sx: {
            position: 'static'
          }
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          {open && (
            <Typography ml={2} variant="h6">
              Conversations
            </Typography>
          )}
          <IconButton onClick={() => setOpen((state) => !state)}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ overflowY: 'auto', overflowX: 'hidden', p: 0 }}>
          {convData?.conversations.map((conversation) => (
            <ChatConversation
              key={conversation.id}
              conversation={conversation}
              open={open}
              selected={profile === conversation.id}
              handleClick={() => handleConversationClick(conversation.id)}
            />
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box
          sx={{ overflowY: 'auto', overflowX: 'hidden', p: 2, width: '100%', flex: 1 }}
          ref={chatContainerRef}
        >
          {msgData?.messages.map((message) => (
            <ChatMessage key={message.date} message={message} own={message.userId !== profile} />
          ))}
        </Box>
        {msgData && <ChatSendForm profile={profile} />}
      </Box>
    </Box>
  );
}

export default PageChat;
