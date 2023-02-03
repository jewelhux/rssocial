import React, { ReactElement } from 'react';
import { Typography, Button } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';

function HeaderComponentLogo():ReactElement {
  return (
    <Button 
      component={Link} 
      color='inherit'  
      to="/" 
      startIcon={<PublicIcon />} 
      sx={{ padding: { xs: '0', md: '0 10px' }, minWidth: { xs: '20px', md: '64px' } }}
    >
        <Typography
          fontWeight={700} 
          variant='h5' 
          sx={{ display: { xs: 'none', md: 'block'} }}
        >
          RSSocial
        </Typography>
    </Button>
  );
}

export default HeaderComponentLogo;
