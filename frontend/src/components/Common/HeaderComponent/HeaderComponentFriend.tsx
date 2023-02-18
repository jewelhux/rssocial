import { ReactElement } from 'react';
import { Badge, Box, MenuItem } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useTranslation } from 'react-i18next';

function HeaderComponentFriend({ title }: IHeaderLink): ReactElement {
  const { t } = useTranslation();
  return (
    <MenuItem
      component={Link}
      to="/friend"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge>
          <PeopleIcon />
        </Badge>
      </Box>
      {title && <p>{t(title)}</p>}
    </MenuItem>
  );
}

export default HeaderComponentFriend;
