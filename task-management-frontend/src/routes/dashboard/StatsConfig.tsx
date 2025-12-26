import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Flame,
  SquareKanban,
  User,
  Users,
  Zap,
} from 'lucide-react';

export const statConfig: {
  label: string;
  key: string;
  icon: React.ElementType;
  color: string;
}[] = [
  { label: 'Clients', key: 'clientCount', icon: User, color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Boards', key: 'boardCount', icon: SquareKanban, color: 'bg-blue-100 text-blue-700' },
  { label: 'Members', key: 'memberCount', icon: Users, color: 'bg-green-100 text-green-700' },
  { label: 'Tasks', key: 'taskCount', icon: ClipboardList, color: 'bg-purple-100 text-purple-700' },
  {
    label: 'Completed Tasks',
    key: 'completedTaskCount',
    icon: CheckCircle2,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Pending Tasks',
    key: 'pendingTaskCount',
    icon: Clock,
    color: 'bg-red-100 text-red-700',
  },
  {
    label: 'Immediate Priority Tasks',
    key: 'immediatePriorityTaskCount',
    icon: Zap,
    color: 'bg-orange-100 text-orange-700',
  },
  {
    label: 'High Priority Tasks',
    key: 'highPriorityTaskCount',
    icon: Flame,
    color: 'bg-pink-100 text-pink-700',
  },
];

export const labelToLink: Record<string, string> = {
  Clients: '/clients',
  Boards: '/boards',
  Members: '/members',
};
