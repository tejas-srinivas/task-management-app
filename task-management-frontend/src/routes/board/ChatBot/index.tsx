import { useEffect, useRef, useState } from 'react';

import { ChatBotInput } from './ChatBotInput';
import ChatMessages from './ChatMessages';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const mockResponses = [
  "That's a great question! Let me check on that for you.",
  'Interesting point. Could you elaborate a bit more?',
  'I see. Based on that, I would recommend the following steps...',
  'I need a bit more information to help you with that.',
];

const getMockResponse = () => {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

export function ChatBotComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: getMockResponse(),
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto mb-4">
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
      </div>
      <div className="flex-shrink-0">
        <ChatBotInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
