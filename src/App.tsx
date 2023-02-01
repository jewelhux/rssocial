import React from 'react';
import DefaultStyle from './components/DefaultStyle';
import Footer from './components/Common/Footer';
import PageChat from './components/Pages/PageChat/PageChat';
import PageProfile from './components/Pages/PageProfile/PageProfile';
import PageStart from './components/Pages/PageStart/PageStart';
import Header from './components/Common/Header';

function App() {
  return (
    <>
      <DefaultStyle />
      <Header />
      {/* <PageStart /> */}
      {/* <PageChat /> */}
      <PageProfile />
      <Footer />
    </>
  );
}

export default App;
