import React, { ReactElement } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';

// function ProfilePage() {
//   // Get the userId param from the URL.
//   const { userId } = useParams();
//   console.log(userId)
//   // .
// }

// ProfilePage()

function HeaderComponentProfile({title}:IHeaderLink):ReactElement {
  return (
    <MenuItem component={Link} to="/profile" sx={{padding: '3', display: 'flex', columnGap: '15px'}}>
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
