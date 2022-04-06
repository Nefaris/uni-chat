import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState, VFC } from 'react';
import { HeadingLarge } from 'baseui/typography';
import dayjs from 'dayjs';
import { Textarea } from 'baseui/textarea';
import { IoMdSend } from 'react-icons/io';
import classNames from 'classnames';
import { Button } from 'baseui/button';
import { Message } from '../../interfaces/message.interface';
import MessagesGroup, { MessagesGroupProps } from '../../components/MessagesGroup/MessagesGroup';
import { useAuth } from '../../providers/AuthProvider';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    scrollAnchor.current?.scrollTo({ top: scrollAnchor.current?.scrollHeight });
  }, []);

  useEffect(() => {
    scrollAnchor.current?.scrollTo({
      behavior: 'smooth',
      top: scrollAnchor.current?.scrollHeight,
    });

    (async () => {
      if (messages.length > 0 && messages[messages.length - 1].user.id === '1') {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await res.json();
        setMessages([...messages, {
          id: `${Math.random() * 1000000}`,
          content: data.value,
          timestamp: dayjs()
            .valueOf(),
          user: {
            id: '2',
            username: 'Bot',
          },
        }]);
      }
    })();
  }, [messages]);

  const handleNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, {
      id: `${Math.random() * 1000000}`,
      content: newMessage,
      timestamp: dayjs()
        .valueOf(),
      user: {
        id: '1',
        username: 'Kozak',
      },
    }]);

    setNewMessage('');
  };

  const handleMessageKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='h-full flex flex-col max-w-md mx-auto px-6 py-6'>
      <header className='flex items-center justify-between mb-6'>
        <HeadingLarge>Chat page</HeadingLarge>
        <Button size='compact' onClick={logout}>Logout</Button>
      </header>

      <div ref={scrollAnchor} className='grid gap-2 pb-6 overflow-auto'>
        {groupMessages(messages)
          .map((group) => (
            <MessagesGroup key={group.messages[0].id} messages={group.messages} />
          ))}
      </div>

      <div className='relative mt-auto'>
        <Textarea
          rows={1}
          placeholder='Type here'
          value={newMessage}
          onChange={handleNewMessageChange}
          onKeyPress={handleMessageKeyDown}
          overrides={{ InputContainer: { style: { paddingRight: '48px' } } }}
        />
        <button
          type='button'
          aria-label='Send'
          disabled={newMessage.length === 0}
          onClick={handleSendMessage}
          className={classNames('absolute transform -translate-y-1/2 top-1/2 right-3 transition-opacity', newMessage.length === 0 && 'opacity-0 cursor-not-allowed')}
        >
          <IoMdSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
