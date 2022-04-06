import { VFC } from 'react';
import classNames from 'classnames';
import { Message } from '../../interfaces/message.interface';
import MessageBubble from '../Message/MessageBubble';

export interface MessagesGroupProps {
  messages: Message[];
}

const MessagesGroup: VFC<MessagesGroupProps> = ({ messages }) => {
  const isMine = messages.length > 0 && messages[0].user.id === '1';

  return (
    <div className={classNames('grid gap-1', isMine ? 'justify-items-end' : 'justify-items-start')}>
      {messages.map((message: Message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isMine={message.user.id === '1'}
          isFirst={messages.indexOf(message) === 0}
          isLast={messages.indexOf(message) === messages.length - 1}
          isMiddle={messages.indexOf(message) !== 0 && messages.indexOf(message) !== messages.length - 1}
          isAlone={messages.length === 1}
        />
      ))}
    </div>
  );
};

export default MessagesGroup;
