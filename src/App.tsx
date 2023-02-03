import React from 'react';
import DefaultStyle from './components/DefaultStyle';
import Footer from './components/Common/Footer';
import PageChat from './components/Pages/PageChat/PageChat';
import PageProfile from './components/Pages/PageProfile/PageProfile';
import PageStart from './components/Pages/PageStart/PageStart';
import Header from './components/Common/Header';
import { Route, Routes } from 'react-router-dom';
import PageFeed from './components/Pages/PageFeed/PageFeed';

function App() {
  return (
    <>
      <DefaultStyle />
      <Header />
      <Routes>
        <Route path='/' element={<PageFeed />} />
        <Route path='/auth' element={<PageStart />}/>
        <Route path='/messages' element={<PageChat />}/>
        <Route path='/profile' element={<PageProfile />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
