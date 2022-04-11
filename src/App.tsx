import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatPage from './pages/ChatPage/ChatPage';
import { useAuth } from './providers/AuthProvider';
import SettingsPage from './pages/SettingsPage/SettingsPage';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-black text-white fixed inset-0 w-full h-full">
      <Routes>
        <Route
          path="/auth/*"
          element={!isAuthenticated ? <AuthPage /> : <Navigate to="/chat" />}
        />

        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/auth" />}
        />

        <Route
          path="/settings"
          element={isAuthenticated ? <SettingsPage /> : <Navigate to="/auth" />}
        />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
};

export default App;
