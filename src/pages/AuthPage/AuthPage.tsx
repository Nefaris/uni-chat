import { VFC } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const AuthPage: VFC = () => (
  <div>
    <div className='mb-6'>
      <Link to='login'>Login</Link>
      <Link to='register'>Register</Link>
    </div>

    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='*' element={<Navigate to='login' />} />
    </Routes>
  </div>
);

export default AuthPage;
