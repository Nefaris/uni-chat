import { VFC } from 'react';
import { HeadingLarge } from 'baseui/typography';
import { Button } from 'baseui/button';
import { useAuth } from '../../providers/AuthProvider';

const ChatPage: VFC = () => {
  const { logout } = useAuth();

  return (
    <div className='max-w-md mx-auto px-6 py-12'>
      <HeadingLarge>Chat page</HeadingLarge>

      <div className='mt-12'>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default ChatPage;
