import { FoldHorizontal, UnfoldHorizontal } from 'lucide-react';

import { Button } from '../ui/button';

export const ExpandButton = ({
  expand,
  setExpand,
}: {
  expand: boolean;
  setExpand: (expand: boolean) => void;
}) => {
  return (
    <Button
      variant="outline"
      onClick={() => setExpand(!expand)}
      className="hidden min-[1500px]:block"
    >
      {expand ? <FoldHorizontal /> : <UnfoldHorizontal />}
    </Button>
  );
};
