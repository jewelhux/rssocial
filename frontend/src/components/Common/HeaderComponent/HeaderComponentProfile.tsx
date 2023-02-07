import { ReactElement } from 'react';
import { Box, Badge, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';

function HeaderComponentProfile({ title }: IHeaderLink): ReactElement {
  return (
    <MenuItem
      component={Link}
      to="/profile"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge color="error">
          <AccountCircle />
        </Badge>
      </Box>
      {title && <p>{title}</p>}
    </MenuItem>
  );
}

export default HeaderComponentProfile;
