import { ReactNode } from 'react';

import Layout from './SidebarLayout';

export default function TaskBoardLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className="p-0 flex flex-col h-full max-w-full border-t bg-dots">
      <div className="grid grid-cols-[1fr_auto] h-full overflow-hidden">{children}</div>
    </Layout>
  );
}
