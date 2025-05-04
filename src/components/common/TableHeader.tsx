import { TableHeaderProps } from '@/types/CitiesTableTypes';
import { memo } from 'react';

const TableHeader: React.FC<TableHeaderProps> = memo(({ activeLayerLabel }) => {
  return (
    <thead className="bg-gray-50 text-gray-600">
      <tr>
        <th className="px-2 py-2 text-left">ID</th>
        <th className="px-2 py-2 text-left">Name</th>
        <th className="px-2 py-2 text-left">{activeLayerLabel}</th>
      </tr>
    </thead>
  );
});

export default TableHeader;
