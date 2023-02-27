import { ReactElement } from 'react';
import { Badge, Box, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useTranslation } from 'react-i18next';

function HeaderComponentProfile({ title }: IHeaderLink): ReactElement {
  const { t } = useTranslation();
  return (
    <MenuItem
      component={Link}
      to="/profile"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge>
          <AccountCircle />
        </Badge>
      </Box>
      {title && <p>{t(title)}</p>}
    </MenuItem>
  );
}

export default HeaderComponentProfile;
