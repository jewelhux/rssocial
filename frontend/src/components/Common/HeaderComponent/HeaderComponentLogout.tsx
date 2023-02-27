import { ReactElement } from 'react';
import { Box, Badge, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useLogoutMutation } from '../../../redux/features/service/authService';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

function HeaderComponentLogout({ title }: IHeaderLink): ReactElement {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [logoutUser] = useLogoutMutation();

  return (
    <MenuItem
      component={Link}
      to="/auth"
      onClick={() =>
        logoutUser()
          .unwrap()
          .then(() => enqueueSnackbar(t('snacks.logout'), { variant: 'success' }))
          .catch(() => {})
      }
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
