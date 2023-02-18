import { ReactElement } from 'react';
import { Box, Badge, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useLogoutMutation } from '../../../redux/features/service/authService';
import { useTranslation } from 'react-i18next';

function HeaderComponentLogout({ title }: IHeaderLink): ReactElement {
  const { t } = useTranslation();
  const [logoutUser] = useLogoutMutation();
  return (
    <MenuItem
      component={Link}
      to="/auth"
      onClick={() => logoutUser()}
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge>
          <LogoutIcon />
        </Badge>
      </Box>
      {title && <p>{t(title)}</p>}
    </MenuItem>
  );
}

export default HeaderComponentLogout;
