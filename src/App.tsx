import { Link, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatPage from './pages/ChatPage/ChatPage';

const App = () => (
  <div>
    <div className='mb-6'>
      <Link to='auth'>Auth</Link>
      <Link to='chat'>Chat</Link>
    </div>

    <Routes>
      <Route path='auth/*' element={<AuthPage />} />
      <Route path='chat' element={<ChatPage />} />
    </Routes>
  </div>
);

export default App;
