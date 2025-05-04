import { SortOption } from '@/types/CitiesTableTypes';
import { memo } from 'react';

interface SortControlsProps {
  readonly sortBy: SortOption;
  readonly onToggleSort: () => void;
}

const SortControls: React.FC<SortControlsProps> = memo(({ sortBy, onToggleSort }) => {
  return (
    <div className="mb-3 flex justify-end">
      <button
        onClick={onToggleSort}
        className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        Sort by: {sortBy === 'name' ? 'Name' : 'ID'}
        <span className="ml-1">{sortBy === 'id' ? '↑' : 'A→Z'}</span>
      </button>
    </div>
  );
});

export default SortControls;
