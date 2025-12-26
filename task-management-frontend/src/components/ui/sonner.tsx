import type { ToasterProps } from 'sonner';
import { Toaster as Sonner } from 'sonner';

import { useViteTheme } from '@/theme/vite';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useViteTheme();
  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
      richColors
      position="top-right"
      theme={theme}
    />
  );
};

export { Toaster, type ToasterProps };
