import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';

function HeaderComponentLogo():ReactElement {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ display: { xs: 'none', sm: 'block' } }}
    >
      RSSocial
    </Typography>
  );
}

export default HeaderComponentLogo;