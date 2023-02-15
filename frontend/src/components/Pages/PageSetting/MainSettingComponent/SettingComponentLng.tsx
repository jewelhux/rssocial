import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { SiteLanguage } from '../../../../utils/enum';

function SettingComponentLng() {
  const [lang, setLang] = useState<string | SiteLanguage>(SiteLanguage.russian);

  const handleChangeLang = (event: SelectChangeEvent) => {
    setLang(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ width: '100%' }}>
      <InputLabel id="lang">Выбор языка</InputLabel>
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
