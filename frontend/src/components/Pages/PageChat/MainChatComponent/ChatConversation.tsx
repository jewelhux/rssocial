import { ReactElement } from 'react';
import { Avatar, ListItem, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import { StyledBadge } from '../../../Common/CustomStyleComponents';
import { Conversation } from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';

const UnreadCounter = styled('div')`
  display: flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.divider};
`;

const UnreadCounterClosed = styled('div')`
  position: absolute;
  font-size: 0.62rem;
  text-align: center;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.theme.palette.error.dark};
`;

function ChatConversation({
  conversation,
  selected,
  open,
  handleClick
}: {
  conversation: Conversation;
  selected: boolean;
  open: boolean;
  handleClick: () => void;
}): ReactElement {
  return (
    <ListItem key={conversation.id} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        selected={selected}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5
        }}
        onClick={handleClick}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          isonlineuser={conversation.online.toString()}
        >
          <Avatar alt="image" src={conversation.avatar || DEFAULT_IMAGE} />
          {conversation.unreadCount > 0 && !open && (
            <UnreadCounterClosed>
              {conversation.unreadCount <= 99 ? conversation.unreadCount : 99}
            </UnreadCounterClosed>
          )}
        </StyledBadge>
        <ListItemText
          primary={conversation.name}
          secondary={
            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {conversation.lastMessage}
            </Typography>
          }
          sx={{ opacity: open ? 1 : 0 }}
        />
        {conversation.unreadCount > 0 && open && (
          <UnreadCounter>{conversation.unreadCount}</UnreadCounter>
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default ChatConversation;
