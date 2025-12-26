import { Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatMessages({
  messages,
  messagesEndRef,
}: {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
        <Bot className="w-16 h-16 mb-4 opacity-60" />
        <h2 className="text-2xl font-semibold mb-2">Chat with PM Agent</h2>
        <p className="text-base opacity-80 px-4">Ask anything about your project, tasks, or get help instantly.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs border border-primary px-2 rounded-md">PM Agent</span>
      {messages.map(message => (
        <div
          key={message.id}
          className={`max-w-xl w-full text-left ${
            message.sender === 'user' ? 'bg-muted rounded-lg p-3' : ''
          }`}
        >
          {message.sender === 'user' ? (
            <pre className="text-sm font-sans whitespace-pre-wrap">{message.text}</pre>
          ) : (
            <p className="text-sm">{message.text}</p>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
