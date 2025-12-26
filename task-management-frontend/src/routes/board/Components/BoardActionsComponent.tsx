import { Filter, MoreVertical, Plus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';

import { UserRoleEnumType } from '@/__generated__/graphql';

import { Button } from '@/components/ui/button';
import { DropdownMenuGroup, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useBoard } from '../BoardContext/useBoard';
import GiveAccessDropdown from '../Components/GiveAccessDropdown';

export default function BoardActionsComponent({
  boardId,
  onShowFilterBar,
}: {
  boardId: string;
  onShowFilterBar: () => void;
}) {
  const navigate = useNavigate();
  const { setShowAddList, showAddList, currentUser: user } = useBoard();
  const currentUser = user;

  return (
    <div className="flex gap-3">
      {currentUser?.role !== UserRoleEnumType.Member && <GiveAccessDropdown />}
      <Button size="sm" className="gap-2" onClick={onShowFilterBar}>
        <Filter className="w-4 h-4" /> Filters
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="w-8 h-8 p-0">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Board Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setShowAddList(true);
              }}
              disabled={showAddList}
            >
              <Plus className="w-4 h-4 mr-2" /> Create a List
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/boards/${boardId}/settings`)}>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
