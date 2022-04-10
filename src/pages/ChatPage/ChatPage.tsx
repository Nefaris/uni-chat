import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState, VFC } from 'react';
import { HeadingLarge } from 'baseui/typography';
import * as Ably from 'ably';
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
  const scrollAnchor = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const {
    logout,
    authToken,
  } = useAuth();

  useEffect(() => {
    scrollAnchor.current?.scrollTo({ top: scrollAnchor.current?.scrollHeight });
  }, []);

  useEffect(() => {
    scrollAnchor.current?.scrollTo({
      behavior: 'smooth',
      top: scrollAnchor.current?.scrollHeight,
    });
  }, [messages]);

  useEffect(() => {
    const client = new Ably.Realtime({ key: 'FWcRgw.v6LxNQ:euekVnxMMrDmhBvSEzZrJBz9lE9zJWbqUippj7qUcno' });
    const channel = client.channels.get('main_chat');
    channel.subscribe((msg: Ably.Types.Message) => {
      const receivedMessage: Message = {
        id: msg.data.uuid,
        content: msg.data.content,
        timestamp: msg.data.created_at,
        user: {
          id: msg.data.user.id,
          username: msg.data.user.username,
        },
      };

      setMessages(prevState => [...prevState, receivedMessage]);
    });

    return () => {
      client.close();
    };
  }, []);

  const handleNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.length === 0) return;

    await fetch('https://uni-chat-backend.herokuapp.com/api/chat/message/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        content: newMessage,
      }),
    });

    setNewMessage('');
  };

  const handleMessageKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
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
            .map((group) => (
              <MessagesGroup key={group.messages[0].id} messages={group.messages} />
            ))}
        </div>
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
