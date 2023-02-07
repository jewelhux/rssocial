import { ReactElement } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HeaderComponentLogin(): ReactElement {
  return (
    <Button component={Link} color="inherit" variant="outlined" to="/auth">
      Вход
    </Button>
  );
}

export default HeaderComponentLogin;
