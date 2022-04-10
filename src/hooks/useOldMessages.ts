import { useEffect, useState } from 'react';
import { Message } from '../interfaces/message.interface';
import { useAuth } from '../providers/AuthProvider';

export const useOldMessages = () => {
  const { authToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [paginationOffset, setPaginationOffset] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(`https://uni-chat-backend.herokuapp.com/api/chat/message?offset=${paginationOffset}&limit=1000000`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const data = await res.json();
        const oldMessages: Message[] = data.results.map((msg: any) => ({
          id: msg.uuid,
          content: msg.content,
          timestamp: msg.created_at,
          user: {
            id: msg.user.id,
            username: msg.user.username,
          },
        }));

        setMessages(oldMessages);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMessages();
  }, [paginationOffset, authToken]);

  const fetchMore = (addOffset: number) => {
    setPaginationOffset(prevState => prevState + 20 + addOffset);
  };

  return {
    fetchMore,
    isFetching,
    messages: messages.reverse(),
  };
};
