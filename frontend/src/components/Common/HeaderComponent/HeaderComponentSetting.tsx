import { ReactElement } from 'react';
import { Box, Badge, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';

function HeaderComponentSetting({ title }: IHeaderLink): ReactElement {
  return (
    <MenuItem
      component={Link}
      to="/setting"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge color="error">
          <SettingsIcon />
        </Badge>
      </Box>
      {title && <p>{title}</p>}
    </MenuItem>
  );
}

export default HeaderComponentSetting;
