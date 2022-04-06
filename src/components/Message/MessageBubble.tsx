import { VFC } from 'react';
import { ParagraphSmall } from 'baseui/typography';
import classNames from 'classnames';
import { Message } from '../../interfaces/message.interface';

export interface MessageProps {
  message: Message;
  isMine?: boolean;
  isFirst?: boolean;
  isMiddle?: boolean;
  isLast?: boolean;
  isAlone?: boolean;
}

const getClassNames = (isMine: boolean, isFirst: boolean, isMiddle: boolean, isLast: boolean, isAlone: boolean) => {
  return classNames([
    'rounded-xl', 'px-4', 'py-2', 'max-w-[75%]',
    isMine ? 'bg-green-500 text-right' : 'bg-gray-500 text-left',
    (!isAlone && isMine && isFirst) && 'rounded-br-none',
    (!isAlone && isMine && isMiddle) && 'rounded-r-none',
    (!isAlone && isMine && isLast) && 'rounded-tr-none',
    (!isAlone && !isMine && isFirst) && 'rounded-bl-none',
    (!isAlone && !isMine && isMiddle) && 'rounded-l-none',
    (!isAlone && !isMine && isLast) && 'rounded-tl-none',
  ]);
};

const MessageBubble: VFC<MessageProps> = ({
  message,
  isMine = false,
  isFirst = false,
  isMiddle = false,
  isLast = false,
  isAlone = false,
}) => {
  return (
    <div className={getClassNames(isMine, isFirst, isMiddle, isLast, isAlone)}>
      <ParagraphSmall className='break-words'>{message.content}</ParagraphSmall>
    </div>
  );
};

export default MessageBubble;
