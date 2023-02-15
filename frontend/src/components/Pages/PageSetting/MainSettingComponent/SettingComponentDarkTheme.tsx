import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import { SiteDarkTheme } from '../../../../utils/enum';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../Layout';

function SettingComponentDarkTheme() {
  const { modeDark, setModeDark } = useContext(ThemeContext);
  const [storageDarkTheme] = useState(localStorage.getItem('DarkTheme'));

  const { t } = useTranslation();

  useEffect(() => {
    if (storageDarkTheme === 'dark') {
      setModeDark('dark');
    } else {
      setModeDark('light');
    }
  }, [setModeDark, storageDarkTheme]);

  const handleChangeDarkTheme = (event: SelectChangeEvent) => {
    if (event.target.value === 'light') {
      setModeDark('light');
      localStorage.setItem('DarkTheme', 'light');
    } else {
      setModeDark('dark');
      localStorage.setItem('DarkTheme', 'dark');
    }
  };

  return (
    <FormControl variant="filled" sx={{ width: '100%' }}>
      <InputLabel id="darktheme">{t('settingLng.settingDarkTheme')}</InputLabel>
      <Select
        sx={{ textAlign: 'left' }}
        labelId="lang"
        id="select-darktheme"
        value={modeDark}
        onChange={handleChangeDarkTheme}
      >
        <MenuItem value={SiteDarkTheme.light}>{t('settingDarkThemeSelect.lightTheme')}</MenuItem>
        <MenuItem value={SiteDarkTheme.dark}>{t('settingDarkThemeSelect.darkTheme')}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SettingComponentDarkTheme;
