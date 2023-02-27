import { ReactElement } from 'react';
import { Box, Badge, MenuItem } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useGetConversationsQuery } from '../../../redux/features/service/chatService';
import { useLoginCheckQuery } from '../../../redux/features/service/authService';
import { useTranslation } from 'react-i18next';

function HeaderComponentMessage({ title }: IHeaderLink): ReactElement {
  const { t } = useTranslation();
  const { data: isLoggedIn } = useLoginCheckQuery();
  const { currentData } = useGetConversationsQuery(undefined, { skip: !isLoggedIn });
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
      {title && <p>{t(title)}</p>}
    </MenuItem>
  );
}

export default HeaderComponentMessage;
