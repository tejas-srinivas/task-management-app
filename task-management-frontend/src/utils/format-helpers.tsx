import { JSX } from 'react';

export const formatStatus = (value: string): JSX.Element => {
  const statuses = {
    ACTIVE: {
      label: 'Active',
      style: 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-900',
      dotStyle: 'bg-green-500 dark:bg-green-300',
    },
    INACTIVE: {
      label: 'Inactive',
      style: 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-900',
      dotStyle: 'bg-red-500 dark:bg-red-300',
    },
    PENDING: {
      label: 'Pending',
      style: 'bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-900',
      dotStyle: 'bg-yellow-500 dark:bg-yellow-300',
    },
    PENDING_PRINTING: {
      label: 'Pending Printing',
      style: 'bg-purple-50 text-purple-800 border border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-900',
      dotStyle: 'bg-purple-500 dark:bg-purple-300',
    },
    HIGH: {
      label: 'High',
      style: 'bg-red-50 text-red-800 border border-red-700 dark:bg-red-900 dark:text-red-200 dark:border-red-900',
      dotStyle: 'bg-red-700 dark:bg-red-400',
    },
    MEDIUM: {
      label: 'Medium',
      style: 'bg-yellow-50 text-yellow-800 border border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-900',
      dotStyle: 'bg-yellow-700 dark:bg-yellow-400',
    },
    LOW: {
      label: 'Low',
      style: 'bg-blue-50 text-blue-800 border border-blue-700 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-900',
      dotStyle: 'bg-blue-700 dark:bg-blue-400',
    },
    IMMEDIATE: {
      label: 'Immediate',
      style: 'bg-purple-50 text-purple-800 border border-purple-700 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-900',
      dotStyle: 'bg-purple-700 dark:bg-purple-400',
    },
  } as const;

  const status = statuses[value as keyof typeof statuses] ?? {
    label: value,
    style: 'bg-gray-50 text-gray-800 border border-gray-200',
    dotStyle: 'bg-gray-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-sm px-2 py-1 text-xs font-medium ${status.style}`}
    >
      <div className={`w-2 h-2 rounded-full ${status.dotStyle}`} />
      {status.label}
    </span>
  ) as JSX.Element;
};

export const formatTag = (value: string): JSX.Element => {
  const tags = {
    // Development
    UI: {
      label: 'UI',
      style: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-800 dark:text-fuchsia-100',
    },
    UX: {
      label: 'UX',
      style: 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100',
    },
    Design: {
      label: 'Design',
      style: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
    },
    Frontend: {
      label: 'Frontend',
      style: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    },
    Backend: {
      label: 'Backend',
      style: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
    },
    'Full Stack': {
      label: 'Full Stack',
      style: 'bg-lime-100 text-lime-800 dark:bg-lime-800 dark:text-lime-100',
    },
    Mobile: {
      label: 'Mobile',
      style: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
    },
    API: {
      label: 'API',
      style: 'bg-sky-200 text-sky-900 dark:bg-sky-900 dark:text-sky-200',
    },
    Database: {
      label: 'Database',
      style: 'bg-violet-200 text-violet-900 dark:bg-violet-900 dark:text-violet-200',
    },
    DevOps: {
      label: 'DevOps',
      style: 'bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200',
    },
    Infrastructure: {
      label: 'Infrastructure',
      style: 'bg-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-200',
    },
    Cloud: {
      label: 'Cloud',
      style: 'bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-200',
    },
    Security: {
      label: 'Security',
      style: 'bg-pink-200 text-pink-900 dark:bg-pink-900 dark:text-pink-200',
    },
    Performance: {
      label: 'Performance',
      style: 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200',
    },
    Testing: {
      label: 'Testing',
      style: 'bg-lime-200 text-lime-900 dark:bg-lime-900 dark:text-lime-200',
    },
    QA: {
      label: 'QA',
      style: 'bg-teal-200 text-teal-900 dark:bg-teal-900 dark:text-teal-200',
    },
    'Code Review': {
      label: 'Code Review',
      style: 'bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-200',
    },
    Refactoring: {
      label: 'Refactoring',
      style: 'bg-orange-200 text-orange-900 dark:bg-orange-900 dark:text-orange-200',
    },
    'Bug Fix': {
      label: 'Bug Fix',
      style: 'bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200',
    },
    Feature: {
      label: 'Feature',
      style: 'bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-200',
    },
    Hotfix: {
      label: 'Hotfix',
      style: 'bg-red-300 text-red-950 dark:bg-red-950 dark:text-red-300',
    },

    // Project Management
    Planning: {
      label: 'Planning',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    Requirements: {
      label: 'Requirements',
      style: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
    },
    Analysis: {
      label: 'Analysis',
      style: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    },
    'Design Review': {
      label: 'Design Review',
      style: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    },
    'Sprint Planning': {
      label: 'Sprint Planning',
      style: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    },
    Retrospective: {
      label: 'Retrospective',
      style: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100',
    },
    Standup: {
      label: 'Standup',
      style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
    },
    Meeting: {
      label: 'Meeting',
      style: 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100',
    },
    Documentation: {
      label: 'Documentation',
      style: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
    },
    Timeline: {
      label: 'Timeline',
      style: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
    },
    Milestone: {
      label: 'Milestone',
      style: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
    },
    Deadline: {
      label: 'Deadline',
      style: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    },
    Priority: {
      label: 'Priority',
      style: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    },
    Blocked: {
      label: 'Blocked',
      style: 'bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200',
    },
    Dependencies: {
      label: 'Dependencies',
      style: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
    },

    // Business & Marketing
    Business: {
      label: 'Business',
      style: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    },
    Marketing: {
      label: 'Marketing',
      style: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    },
    Analytics: {
      label: 'Analytics',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    SEO: {
      label: 'SEO',
      style: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },
    Content: {
      label: 'Content',
      style: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    },
    'Social Media': {
      label: 'Social Media',
      style: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
    },
    'Email Marketing': {
      label: 'Email Marketing',
      style: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100',
    },
    Campaign: {
      label: 'Campaign',
      style: 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100',
    },
    ROI: {
      label: 'ROI',
      style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
    },
    Conversion: {
      label: 'Conversion',
      style: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
    },
    'User Research': {
      label: 'User Research',
      style: 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100',
    },
    'Customer Feedback': {
      label: 'Customer Feedback',
      style: 'bg-lime-100 text-lime-800 dark:bg-lime-800 dark:text-lime-100',
    },
    Sales: {
      label: 'Sales',
      style: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },
    Support: {
      label: 'Support',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },

    // Technical Categories
    Architecture: {
      label: 'Architecture',
      style: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
    },
    'System Design': {
      label: 'System Design',
      style: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100',
    },
    Integration: {
      label: 'Integration',
      style: 'bg-violet-100 text-violet-800 dark:bg-violet-800 dark:text-violet-100',
    },
    Migration: {
      label: 'Migration',
      style: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
    },
    Deployment: {
      label: 'Deployment',
      style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
    },
    Monitoring: {
      label: 'Monitoring',
      style: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    },
    Logging: {
      label: 'Logging',
      style: 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100',
    },
    Backup: {
      label: 'Backup',
      style: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100',
    },
    Recovery: {
      label: 'Recovery',
      style: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    },
    Scalability: {
      label: 'Scalability',
      style: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    },
    Optimization: {
      label: 'Optimization',
      style: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
    },
    Maintenance: {
      label: 'Maintenance',
      style: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
    },
    Upgrade: {
      label: 'Upgrade',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    Compliance: {
      label: 'Compliance',
      style: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },
    Audit: {
      label: 'Audit',
      style: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    },

    // Team & Collaboration
    'Team Lead': {
      label: 'Team Lead',
      style: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    },
    Mentoring: {
      label: 'Mentoring',
      style: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100',
    },
    Onboarding: {
      label: 'Onboarding',
      style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
    },
    Training: {
      label: 'Training',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    'Knowledge Share': {
      label: 'Knowledge Share',
      style: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    },
    'Pair Programming': {
      label: 'Pair Programming',
      style: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
    },
    Collaboration: {
      label: 'Collaboration',
      style: 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100',
    },
    External: {
      label: 'External',
      style: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
    },
    Client: {
      label: 'Client',
      style: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    },
    Stakeholder: {
      label: 'Stakeholder',
      style: 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100',
    },

    // Time & Urgency
    Urgent: {
      label: 'Urgent',
      style: 'bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200',
    },
    Critical: {
      label: 'Critical',
      style: 'bg-red-300 text-red-950 dark:bg-red-950 dark:text-red-300',
    },
    'High Priority': {
      label: 'High Priority',
      style: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
    },
    'Low Priority': {
      label: 'Low Priority',
      style: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
    },
    'Quick Win': {
      label: 'Quick Win',
      style: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },
    'Long Term': {
      label: 'Long Term',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    Research: {
      label: 'Research',
      style: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    },
    Investigation: {
      label: 'Investigation',
      style: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
    },
    Exploration: {
      label: 'Exploration',
      style: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    },
    POC: {
      label: 'POC',
      style: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100',
    },
    MVP: {
      label: 'MVP',
      style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
    },
    Production: {
      label: 'Production',
      style: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },
    Staging: {
      label: 'Staging',
      style: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    },
    Development: {
      label: 'Development',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    Review: {
      label: 'Review',
      style: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },

    // Industry Specific
    'E-commerce': {
      label: 'E-commerce',
      style: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    },
    Healthcare: {
      label: 'Healthcare',
      style: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    },
    Finance: {
      label: 'Finance',
      style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
    },
    Education: {
      label: 'Education',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    Entertainment: {
      label: 'Entertainment',
      style: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    },
    'Real Estate': {
      label: 'Real Estate',
      style: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
    },
    Travel: {
      label: 'Travel',
      style: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    },
    Food: {
      label: 'Food',
      style: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
    },
    Fitness: {
      label: 'Fitness',
      style: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    },
    Gaming: {
      label: 'Gaming',
      style: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
    },
    Social: {
      label: 'Social',
      style: 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100',
    },
    Enterprise: {
      label: 'Enterprise',
      style: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
    },
    SaaS: {
      label: 'SaaS',
      style: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100',
    },
    B2B: {
      label: 'B2B',
      style: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    },
    B2C: {
      label: 'B2C',
      style: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    },
  } as const;

  const tag = tags[value as keyof typeof tags] ?? {
    label: value,
    style: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
  };

  return (
    <span className={`rounded-sm px-2 py-1 text-xs font-medium ${tag.style}`}>{tag.label}</span>
  ) as JSX.Element;
};

export const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    MEMBER: 'Member',
    CLIENT_ADMIN: 'Admin',
    SUPER_ADMIN: 'Super Admin',
  };

  return roleMap[role] || role;
};
