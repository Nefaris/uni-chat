import { ChangeEvent, KeyboardEvent, useState, VFC } from 'react';
import { Textarea } from 'baseui/textarea';
import classNames from 'classnames';
import { IoMdSend } from 'react-icons/io';

export interface NewMessageInputProps {
  value: string;
  onSubmit: (message: string) => void;
}

const NewMessageInput: VFC<NewMessageInputProps> = ({
  value,
  onSubmit,
}) => {
  const [innerValue, setInnerValue] = useState<string>(value);

  const handleNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInnerValue(e.target.value);
  };

  const handleNewMessageSubmit = () => {
    onSubmit(innerValue);
  };

  const handleMessageKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNewMessageSubmit();
    }
  };

  return (
    <div className='relative'>
      <Textarea
        rows={1}
        placeholder='Type here'
        value={innerValue}
        onChange={handleNewMessageChange}
        onKeyPress={handleMessageKeyDown}
        overrides={{ InputContainer: { style: { paddingRight: '48px' } } }}
      />
      <button
        type='button'
        aria-label='Send'
        disabled={innerValue.length === 0}
        onClick={handleNewMessageSubmit}
        className={classNames('absolute transform -translate-y-1/2 top-1/2 right-3 transition-opacity', innerValue.length === 0 && 'opacity-0 cursor-not-allowed')}
      >
        <IoMdSend size={24} />
      </button>
    </div>
  );
};

export default NewMessageInput;
