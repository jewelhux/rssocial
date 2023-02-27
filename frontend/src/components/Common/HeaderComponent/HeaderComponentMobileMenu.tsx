import { ReactElement } from 'react';
import { Box, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import { IHeaderMobileMenu } from '../../../utils/interfaces';

function HeaderComponentMobileMenu({
  mobileMenuId,
  handleMobileMenuOpen
}: IHeaderMobileMenu): ReactElement {
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </Box>
  );
}

export default HeaderComponentMobileMenu;
