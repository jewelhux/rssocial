import { ReactElement } from 'react';
import { Avatar, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import { StyledBadge } from '../../../Common/CustomStyleComponents';
import { Conversation } from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';

const UnreadCounter = styled('div')`
  display: flex;
  font-size: 0.9rem;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.divider};
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
          <Avatar alt="image" src={conversation.avatar ?? DEFAULT_IMAGE} />
        </StyledBadge>
        <ListItemText
          primary={conversation.name}
          secondary={conversation.lastMessage}
          sx={{ opacity: open ? 1 : 0 }}
        />
        {conversation.unreadCount > 0 && <UnreadCounter>{conversation.unreadCount}</UnreadCounter>}
      </ListItemButton>
    </ListItem>
  );
}

export default ChatConversation;
