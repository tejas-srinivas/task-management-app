import { DetailsPanel, ThemeToggle } from '@/components';
import Layout from '@/layouts/SidebarLayout';
import { useViteTheme } from '@/theme/vite';

import { getUser } from '@/utils/auth';
import { formatRole, formatStatus } from '@/utils/format-helpers';

import LogoutDialogButton from './LogoutDialogButton';

export default function Settings() {
  const user = getUser();
  const { theme, setTheme } = useViteTheme();

  const themeLabel = theme === 'light' ? 'Light Mode' : theme === 'dark' ? 'Dark Mode' : 'System';

  return (
    <Layout title="Settings" subtitle="Manage your appearance and preferences">
      <DetailsPanel
        data={user}
        title="User Profile"
        subTitle="Your account information"
        fields={[
          { label: 'Full Name', fieldName: 'fullName', type: 'STRING' },
          { label: 'Email', fieldName: 'email', type: 'STRING' },
          {
            label: 'Role',
            fieldName: 'role',
            type: 'STRING',
            formatter: (role: string) => formatRole(role),
          },
          {
            label: 'Status',
            fieldName: 'status',
            type: 'STRING',
            formatter: (status: string) => formatStatus(status),
          },
        ]}
        layout="grid"
      />
      <div className="mt-4 flex items-center gap-6 border border-border rounded-lg p-2 px-4 w-fit">
        <span className="font-semibold text-base text-card-foreground flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-primary font-bold text-sm uppercase tracking-wide">
            {themeLabel}
          </span>
        </span>
        <ThemeToggle onThemeChange={theme => setTheme(theme)} />
      </div>
      <div className="flex justify-start mt-6">
        <LogoutDialogButton />
      </div>
    </Layout>
  );
}
