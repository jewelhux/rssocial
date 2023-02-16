import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Common/Header';
import Footer from './Common/Footer';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import DefaultStyle from './DefaultStyle';
import { ThemeContextType } from '../utils/Type';
import { useTranslation } from 'react-i18next';

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

  const [storageDarkTheme] = useState(localStorage.getItem('DarkTheme'));

  useEffect(() => {
    if (storageDarkTheme === 'dark') {
      setModeDark('dark');
    } else {
      setModeDark('light');
    }
  }, [setModeDark, storageDarkTheme]);

  const [storageLang] = useState(localStorage.getItem('lang'));
  const { i18n } = useTranslation();

  useEffect(() => {
    if (storageLang === 'en') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  }, [i18n, storageLang]);

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
