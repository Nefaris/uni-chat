import { useEffect, useState } from 'react';
import * as Ably from 'ably';
import { Message } from '../interfaces/message.interface';
import { useAuth } from '../providers/AuthProvider';

interface Options {
  onSendSuccess?: () => void;
}

export const useCurrentMessages = (options?: Options) => {
  const { authToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

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

  const sendMessage = async (message: string) => {
    await fetch('https://uni-chat-backend.herokuapp.com/api/chat/message/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        content: message,
      }),
    });

    options?.onSendSuccess?.();
  };

  return {
    messages,
    sendMessage,
  };
};
