import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Common/Header';
import Footer from './Common/Footer';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import DefaultStyle from './DefaultStyle';
import { ThemeContextType } from '../utils/Type';

export const ThemeContext = createContext<ThemeContextType>({
  modeDark: 'light',
  setModeDark: () => {}
});

const Layout = () => {
  const [modeDark, setModeDark] = useState<'light' | 'dark'>('light');
  const darkTheme = createTheme({
    palette: {
      mode: modeDark
    }
  });
  return (
    <ThemeContext.Provider value={{ modeDark, setModeDark }}>
      <ThemeProvider theme={darkTheme}>
        <DefaultStyle />
        <Header />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Layout;
