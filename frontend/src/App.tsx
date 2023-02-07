import { useState } from 'react';
import DefaultStyle from './components/DefaultStyle';
import Footer from './components/Common/Footer';
import PageChat from './components/Pages/PageChat/PageChat';
import PageProfile from './components/Pages/PageProfile/PageProfile';
import PageStart from './components/Pages/PageStart/PageStart';
import Header from './components/Common/Header';
import { Route, Routes } from 'react-router-dom';
import PageFeed from './components/Pages/PageFeed/PageFeed';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import PageFriend from './components/Pages/PageFriend/PageFriend';
import PageSetting from './components/Pages/PageSetting/PageSetting';

function App() {
  const [modeDark, setmodeDark] = useState<'light' | 'dark'>('light');
  const darkTheme = createTheme({
    palette: {
      mode: modeDark
    }
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <DefaultStyle />
        <Header setmodeDark={setmodeDark} modeDark={modeDark} />
        <Routes>
          <Route path="/" element={<PageFeed />} />
          <Route path="/auth" element={<PageStart />} />
          <Route path="/messages" element={<PageChat />} />
          <Route path="/profile" element={<PageProfile />} />
          <Route path="/friend" element={<PageFriend />} />
          <Route path="/setting" element={<PageSetting />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
