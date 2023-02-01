import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';

function HeaderComponentMessage({title}:IHeaderLink):ReactElement {
  return (
    <MenuItem component={Link} to="/messages" sx={{padding: '3', display: 'flex', columnGap: '15px'}}>
      <Box>
        <Badge badgeContent={69} color="error">
          <MailIcon />
        </Badge>
      </Box>
      {title && <p>{title}</p>}
    </MenuItem>
  );
}

export default HeaderComponentMessage;