import React from 'react';
import HeaderLogin from './HeaderLogin';
import MainLogin from './MainLogin';
import MainRegistrations from './MainRegistrations';

function PageStart() {
  return (
    <>
      {/* <HeaderLogin /> */}
      {/* Выбрать необходимую страничку */}
      {/* <MainLogin /> */}
      <MainRegistrations />
    </>
  );
}

export default PageStart;