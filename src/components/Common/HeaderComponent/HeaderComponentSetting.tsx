import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';

function HeaderComponentSetting({title}:IHeaderLink):ReactElement {
  return (
    <MenuItem component={Link} to="/setting" sx={{padding: '3', display: 'flex', columnGap: '15px'}}>
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
