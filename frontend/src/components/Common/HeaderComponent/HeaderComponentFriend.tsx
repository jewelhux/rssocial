import { ReactElement } from 'react';
import { Box, Badge, MenuItem } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';

function HeaderComponentFriend({ title }: IHeaderLink): ReactElement {
  return (
    <MenuItem
      component={Link}
      to="/friend"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge color="error">
          <PeopleIcon />
        </Badge>
      </Box>
      {title && <p>{title}</p>}
    </MenuItem>
  );
}

export default HeaderComponentFriend;
