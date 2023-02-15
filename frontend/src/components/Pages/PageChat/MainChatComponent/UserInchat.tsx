import { ReactElement } from 'react';
import { Avatar, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { StyledBadge } from '../../../Common/CustomStyleComponents';
import { Conversation } from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';

function UserInChat({ conversation }: { conversation: Conversation }): ReactElement {
  const theme = useTheme();

  const isMatchMoreScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <ListItem sx={{ cursor: 'pointer' }}>
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
    </>
  );
}

export default UserInChat;
