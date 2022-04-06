import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatPage from './pages/ChatPage/ChatPage';

const App = () => (
  <div>
    <Routes>
      <Route path='auth/*' element={<AuthPage />} />
      <Route path='chat' element={<ChatPage />} />
    </Routes>
  </div>
);

export default App;
