import { ReactElement } from 'react';
import { Badge, Box, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { IHeaderLink } from '../../../utils/interfaces';
import { useTranslation } from 'react-i18next';

function HeaderComponentSetting({ title }: IHeaderLink): ReactElement {
  const { t } = useTranslation();
  return (
    <MenuItem
      component={Link}
      to="/setting"
      sx={{ padding: '3', display: 'flex', columnGap: '15px' }}
    >
      <Box>
        <Badge>
          <SettingsIcon />
        </Badge>
      </Box>
      {title && <p>{t(title)}</p>}
    </MenuItem>
  );
}

export default HeaderComponentSetting;
