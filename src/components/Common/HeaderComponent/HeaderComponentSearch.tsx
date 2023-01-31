import React, { ReactElement } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Common/CustomStyleComponents';

function HeaderComponentSearch():ReactElement {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Поиск…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}

export default HeaderComponentSearch;