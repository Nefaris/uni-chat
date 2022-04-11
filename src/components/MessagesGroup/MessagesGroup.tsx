import { VFC } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Message } from '../../interfaces/message.interface';
import MessageBubble from '../MessageBubble/MessageBubble';
import { useAuth } from '../../providers/AuthProvider';

export interface MessagesGroupProps {
  messages: Message[];
}

const MessagesGroup: VFC<MessagesGroupProps> = ({ messages }) => {
  const { currentUser } = useAuth();
  const isMine = messages.length > 0 && messages[0].user.id === currentUser?.userId;

  return (
    <div className="grid gap-1 overflow-hidden">
      {messages.length > 0 && (
        <p
          className={classNames('text-xs mb-0.5 mx-3', isMine ? 'place-self-end' : 'place-self-start')}
        >
          {messages[0].user.username}
        </p>
      )}

      {messages.map((message: Message) => (
        <motion.div
          className={classNames('flex flex-col', isMine ? 'items-end' : 'items-start')}
          key={message.id}
          initial={{
            opacity: 0,
            x: isMine ? 50 : -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
        >
          <MessageBubble
            isMine={isMine}
            message={message}
            isFirst={messages.indexOf(message) === 0}
            isLast={messages.indexOf(message) === messages.length - 1}
            isMiddle={messages.indexOf(message) !== 0 && messages.indexOf(message) !== messages.length - 1}
            isAlone={messages.length === 1}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MessagesGroup;
