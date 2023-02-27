import { ReactElement, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Common/CustomStyleComponents';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeaderComponentSearch(): ReactElement {
  const { t } = useTranslation();
  const [inputSearch, setInputSearch] = useState('');
  const navigate = useNavigate();

  const getRusultSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const handleKeyPressEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      navigate(`/search?name=${inputSearch}`);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={getRusultSearch}
        onKeyPress={handleKeyPressEnter}
        placeholder={t('header.search').toString()}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}

export default HeaderComponentSearch;
