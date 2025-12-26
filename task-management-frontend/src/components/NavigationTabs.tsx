import React from 'react';
import { NavLink, useLocation } from 'react-router';

const NavigationTabs: React.FC<{
  tabs: {
    id: string;
    label: string;
    path: string;
  }[];
  className?: string;
}> = ({ tabs, className = '' }) => {
  const { pathname } = useLocation();

  const isActive = (tab: { path: string }) => tab.path === pathname;

  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
    >
      <nav className="flex space-x-1">
        {tabs.map(tab => (
          <NavLink
            key={tab.id}
            to={tab.path}
            replace
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              isActive(tab)
                ? 'bg-background text-foreground shadow-sm'
                : 'hover:bg-background/50 hover:text-foreground'
            }`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;
