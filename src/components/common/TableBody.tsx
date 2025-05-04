import { memo } from 'react';
import CityTableRow from '../features/visualization/CityTableRow';
import { TableBodyProps } from '@/types/CitiesTableTypes';

const TableBody: React.FC<TableBodyProps> = memo(({ cities, activeLayer }) => {
  return (
    <tbody>
      {cities.map(city => (
        <CityTableRow key={city.id} city={city} activeLayer={activeLayer} />
      ))}
    </tbody>
  );
});

export default TableBody;
