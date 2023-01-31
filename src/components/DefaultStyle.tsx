import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from "@mui/material";

function DefaultStyle() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {height: '100%' },
          html: {height: '100%' }
        }}
      />
    </>
  );
}

export default DefaultStyle;