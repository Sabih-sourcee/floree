export const SkeletonCard = () => (
  <div className="flex flex-col gap-4">
    <div className="aspect-[4/3] rounded-3xl skeleton" />
    <div className="px-1 flex flex-col gap-2">
      <div className="h-5 w-3/4 rounded-full skeleton" />
      <div className="h-3 w-1/2 rounded-full skeleton" />
    </div>
  </div>
);
