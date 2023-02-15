import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { SiteLanguage } from '../../../../utils/enum';
import { useTranslation } from 'react-i18next';

function SettingComponentLng() {
  const [storageLang, setStorageLang] = useState(localStorage.getItem('lang'));
  const [lang, setLang] = useState<string | SiteLanguage>(
    storageLang === 'en' ? SiteLanguage.english : SiteLanguage.russian
  );

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (storageLang) {
      localStorage.setItem('lang', storageLang);
      i18n.changeLanguage(storageLang);
    }
  }, [i18n, storageLang]);

  const handleChangeLang = (event: SelectChangeEvent) => {
    setLang(event.target.value);
    if (event.target.value === SiteLanguage.russian) {
      setStorageLang('ru');
    } else {
      setStorageLang('en');
    }
  };

  return (
    <FormControl variant="filled" sx={{ width: '100%' }}>
      <InputLabel id="lang">{t('settingLng.settingLng')}</InputLabel>
      <Select
        sx={{ textAlign: 'left' }}
        labelId="lang"
        id="select-lang"
        value={lang}
        onChange={handleChangeLang}
      >
        <MenuItem value={SiteLanguage.russian}>{SiteLanguage.russian}</MenuItem>
        <MenuItem value={SiteLanguage.english}>{SiteLanguage.english}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SettingComponentLng;
