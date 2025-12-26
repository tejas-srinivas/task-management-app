import { ReactNode } from 'react';

import Icon from '@/assests/icon.png';
import { Layout as SidebarLayout } from '@/components';

import { getSidebarItems, sideBarTitle, sidebarSubtitle } from '@/utils/sidebar-items';

export default function Layout({
  children,
  title,
  subtitle,
  breadcrumbs,
  onBack,
  className,
}: {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  onBack?: () => void;
  className?: string;
}) {
  const sidebarItems = getSidebarItems();
  return (
    <SidebarLayout
      title={title}
      subtitle={subtitle}
      breadcrumbs={breadcrumbs}
      onBack={onBack}
      sidebar={{
        title: sideBarTitle,
        subtitle: sidebarSubtitle,
        logo: Icon,
        items: sidebarItems,
      }}
      className={className}
    >
      {children}
    </SidebarLayout>
  );
}
