import React from 'react';
import DefaultStyle from './components/DefaultStyle';
import Footer from './components/Common/Footer';
import PageChat from './components/PageChat/PageChat';
import PageProfile from './components/PageProfile/PageProfile';
import PageStart from './components/PageStart/PageStart';

function App() {
  return (
    <>
      <DefaultStyle />
      {/* <PageStart /> */}
      <PageChat />
      {/* <PageProfile /> */}
      <Footer />
    </>
  );
}

export default App;
