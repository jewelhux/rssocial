import PageChat from './components/Pages/PageChat/PageChat';
import PageProfile from './components/Pages/PageProfile/PageProfile';
import PageStart from './components/Pages/PageStart/PageStart';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageFeed from './components/Pages/PageFeed/PageFeed';
import PageFriend from './components/Pages/PageFriend/PageFriend';
import PageSetting from './components/Pages/PageSetting/PageSetting';
import Layout from './components/Layout';
import RequireAuth from './components/Common/RequireAuth';
import PageSearch from './components/Pages/PageSearch/PageSearch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PageFeed />} />
        <Route path="/auth" element={<PageStart />} />
        <Route element={<RequireAuth />}>
          <Route path="/messages" element={<PageChat />} />
          <Route path="/profile" element={<PageProfile />} />
          <Route path="/friend" element={<PageFriend />} />
          <Route path="/setting" element={<PageSetting />} />
          <Route path="/search" element={<PageSearch />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
