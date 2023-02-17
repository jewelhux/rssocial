import { ReactElement } from 'react';
import { Box, Badge, MenuItem } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useGetConversationsQuery } from '../../../redux/features/service/chatService';

function HeaderComponentMessage({ title }: IHeaderLink): ReactElement {
  const { currentData } = useGetConversationsQuery();
  const unreadMessages =
    currentData?.conversations.reduce((sum, conv) => sum + conv.unreadCount, 0) ?? 0;
  return (
    <MenuItem
      component={Link}
      to="/messages"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge badgeContent={unreadMessages} color="error">
          <MailIcon />
        </Badge>
      </Box>
      {title && <p>{title}</p>}
    </MenuItem>
  );
}

export default HeaderComponentMessage;
