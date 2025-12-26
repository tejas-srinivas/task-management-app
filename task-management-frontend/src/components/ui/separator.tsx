import * as React from 'react';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/utils/classnames';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-neutral-300 shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px',
        'dark:bg-neutral-700',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
