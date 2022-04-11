import {
  ChangeEvent, KeyboardEvent, useState, VFC,
} from 'react';
import { Textarea } from 'baseui/textarea';
import classNames from 'classnames';
import { IoMdSend } from 'react-icons/io';

export interface NewMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

const NewMessageInput: VFC<NewMessageInputProps> = ({
  value,
  onSubmit,
  onChange,
}) => {
  const handleNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleNewMessageSubmit = () => {
    onSubmit(value);
  };

  const handleMessageKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNewMessageSubmit();
    }
  };

  return (
    <div className="relative">
      <Textarea
        rows={1}
        placeholder="Type here"
        value={value}
        onChange={handleNewMessageChange}
        onKeyPress={handleMessageKeyDown}
        overrides={{ InputContainer: { style: { paddingRight: '48px' } } }}
      />
      <button
        type="button"
        aria-label="Send"
        disabled={value.length === 0}
        onClick={handleNewMessageSubmit}
        className={classNames('absolute transform -translate-y-1/2 top-1/2 right-3 transition-opacity', value.length === 0 && 'opacity-0 cursor-not-allowed')}
      >
        <IoMdSend size={24} />
      </button>
    </div>
  );
};

export default NewMessageInput;
