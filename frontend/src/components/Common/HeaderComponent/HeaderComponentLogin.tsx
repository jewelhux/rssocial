import { ReactElement } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeaderComponentLogin(): ReactElement {
  const { t } = useTranslation();
  return (
    <Button component={Link} color="inherit" variant="outlined" to="/auth">
      {t('header.login')}
    </Button>
  );
}

export default HeaderComponentLogin;
