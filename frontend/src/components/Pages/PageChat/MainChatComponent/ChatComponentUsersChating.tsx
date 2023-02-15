import { ReactElement, useContext } from 'react';
import { List, Box, Avatar, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Context } from '../../../Context/context';
import { useGetConversationsQuery } from '../../../../redux/features/service/chatService';
import { StyledBadge } from '../../../Common/CustomStyleComponents';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { useSearchParams } from 'react-router-dom';

function ChatComponentUsersChating({
  profile,
  setProfile
}: {
  profile: number;
  setProfile: React.Dispatch<React.SetStateAction<number>>;
}): ReactElement {
  const [searchParams] = useSearchParams();
  const newChat = searchParams.get('newmessage')
    ? Number(searchParams.get('newmessage'))
    : undefined;
  const { isOpenUsers } = useContext(Context);
  const theme = useTheme();
  const isMatchMoreScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const { data } = useGetConversationsQuery(newChat);

  return (
    <Box
      sx={{ display: `${isOpenUsers ? 'flex' : 'none'}`, flexDirection: 'column', maxWidth: '30%' }}
    >
      <List sx={{ flexGrow: 1, overflowY: 'scroll', overflowX: 'hidden' }}>
        {data &&
          [...data.conversations]
            .sort((a, b) => b.lastUpdate - a.lastUpdate)
            .map((conversation) => (
              <ListItem
                key={conversation.id}
                onClick={() => setProfile(conversation.id)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: conversation.id === profile ? 'red' : 'white'
                }}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  isonlineuser={conversation.online.toString()}
                >
                  <Avatar alt="image" src={conversation.avatar ?? DEFAULT_IMAGE} />
                </StyledBadge>
                {isMatchMoreScreen && (
                  <ListItemText>
                    <div>{conversation.name}</div>
                    <div style={{ fontSize: '12px' }}>{conversation.lastMessage}</div>
                  </ListItemText>
                )}
              </ListItem>
            ))}
      </List>
    </Box>
  );
}

export default ChatComponentUsersChating;
