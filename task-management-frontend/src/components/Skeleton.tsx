import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';

import Loader from './Loader';

export default function Skeleton() {
  return (
    <div className="flex flex-col space-y-6 border border-gray-100 p-4 rounded-lg">
      <Loader />
      <ShadcnSkeleton className="h-64 w-full rounded-md" />

      <div className="flex gap-x-2">
        <ShadcnSkeleton className="h-10 w-32 rounded-md" />
        <ShadcnSkeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}
