import { useEffect, useRef, useState, VFC } from 'react';
import { HeadingLarge } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Message } from '../../interfaces/message.interface';
import MessagesGroup, { MessagesGroupProps } from '../../components/MessagesGroup/MessagesGroup';
import { useAuth } from '../../providers/AuthProvider';
import { useOldMessages } from '../../hooks/useOldMessages';
import { useCurrentMessages } from '../../hooks/useCurrentMessages';
import NewMessageInput from '../../components/NewMessageInput/NewMessageInput';

const groupMessages = (messageList: Message[]): MessagesGroupProps[] => {
  const groups: MessagesGroupProps[] = [];
  let currentGroup: Message[] = [];

  messageList.forEach((message: Message) => {
    if (currentGroup.length === 0) {
      currentGroup.push(message);
    } else {
      const lastInGroup = currentGroup[currentGroup.length - 1];
      if ((lastInGroup.user.id === message.user.id)) {
        currentGroup.push(message);
      } else {
        groups.push({ messages: currentGroup });
        currentGroup = [message];
      }
    }
  });

  if (currentGroup.length > 0) {
    groups.push({ messages: currentGroup });
  }

  return groups;
};

const ChatPage: VFC = () => {
  const { logout } = useAuth();
  const scrollAnchor = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

  const oldMessages = useOldMessages();
  const currentMessages = useCurrentMessages({
    onSendSuccess: () => {
      setNewMessage('');
    },
  });

  const messages = [...oldMessages.messages, ...currentMessages.messages].sort((a, b) => a.timestamp - b.timestamp);

  useEffect(() => {
    scrollAnchor.current?.scrollTo({
      behavior: 'smooth',
      top: scrollAnchor.current?.scrollHeight,
    });
  }, [messages.length]);

  const handleNewMessageSubmit = async (message: string) => {
    await currentMessages.sendMessage(message);
    setNewMessage('');
  };

  const handleNewMessageChange = (message: string) => {
    setNewMessage(message);
  };

  return (
    <div className='h-full flex flex-col container mx-auto px-6 py-6'>
      <header className='flex items-center justify-between mb-6'>
        <HeadingLarge>Chat page</HeadingLarge>
        <Button size='compact' onClick={logout}>Logout</Button>
      </header>

      <div ref={scrollAnchor} className='overflow-auto'>
        <div className='grid gap-2 pb-6 '>
          {groupMessages(messages)
            .map((group: MessagesGroupProps) => (
              <MessagesGroup key={group.messages[0].id} messages={group.messages} />
            ))}
        </div>
      </div>

      <div className='mt-auto'>
        <NewMessageInput
          value={newMessage}
          onChange={handleNewMessageChange}
          onSubmit={handleNewMessageSubmit}
        />
      </div>
    </div>
  );
};

export default ChatPage;
