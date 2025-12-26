import { ArrowUp, Square } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components';
import TextField from '@/primitives/TextField';

interface ChatBotInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatBotInput({ onSendMessage, isLoading }: ChatBotInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (value: string | number) => {
    const str = String(value);
    setMessage(str);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="relative w-full">
      <TextField
        type="textarea"
        value={message}
        onChange={handleChange}
        placeholder="Ask a question..."
        className="pr-12 resize-none max-h-40 min-h-[40px] w-full"
        onKeyDown={handleKeyDown}
        ref={textareaRef}
      />
      <Button
        size="icon"
        className="absolute right-2 bottom-2 bg-primary rounded-full w-7 h-7"
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        tabIndex={0}
      >
        {isLoading ? <Square className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
      </Button>
    </div>
  );
}
