import React, { ReactElement } from 'react';
import { Typography, Button } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';

function HeaderComponentLogo():ReactElement {
  return (
    <Button component={Link} color='inherit'  to="/" startIcon={<PublicIcon />}>
      <Typography fontWeight={700} variant='h5'>RSSocial</Typography>
    </Button>
  );
}

export default HeaderComponentLogo;