import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Common/Header';
import Footer from './Common/Footer';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import DefaultStyle from './DefaultStyle';

const Layout = () => {
  const [modeDark, setmodeDark] = useState<'light' | 'dark'>('light');
  const darkTheme = createTheme({
    palette: {
      mode: modeDark
    }
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <DefaultStyle />
      <Header setmodeDark={setmodeDark} modeDark={modeDark} />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
