import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { SiteLanguage } from '../../../../utils/enum';
import { useTranslation } from 'react-i18next';

function SettingComponentLng() {
  const [lang, setLang] = useState<string | SiteLanguage>(SiteLanguage.russian);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string | SiteLanguage) => {
    i18n.changeLanguage(language);
  };

  const handleChangeLang = (event: SelectChangeEvent) => {
    setLang(event.target.value);
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
        <MenuItem value={SiteLanguage.russian} onClick={() => changeLanguage('ru')}>
          {SiteLanguage.russian}
        </MenuItem>
        <MenuItem value={SiteLanguage.english} onClick={() => changeLanguage('en')}>
          {SiteLanguage.english}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default SettingComponentLng;
