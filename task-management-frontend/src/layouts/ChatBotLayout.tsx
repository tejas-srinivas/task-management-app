import { Bot, X } from 'lucide-react';
import { ReactNode } from 'react';

import { cn } from '@/utils/classnames';

interface ChatBotLayoutProps {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function ChatBotLayout({ isOpen, onToggle, children }: ChatBotLayoutProps) {
  return (
    <>
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed z-50 bottom-6 right-6 bg-primary text-primary-foreground rounded-full shadow-lg p-3 flex items-center justify-center hover:bg-primary/90"
          aria-label="Open ChatBot"
          title="Chat with PM Agent"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}
      {isOpen && (
        <div
          className={cn(
            'relative h-[calc(100vh-65px)] border-l bg-background transition-all duration-300',
            isOpen
              ? 'w-full max-w-full p-2 sm:w-[350px] sm:max-w-[400px] sm:p-4'
              : 'w-0 sm:w-0 p-0 overflow-hidden'
          )}
        >
          <span className="absolute top-4 left-3 bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-0.5 rounded-md">
            Beta
          </span>
          <button
            onClick={onToggle}
            className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
            aria-label="Close ChatBot"
          >
            <X className="h-5 w-5" />
          </button>
          {children}
        </div>
      )}
    </>
  );
}
