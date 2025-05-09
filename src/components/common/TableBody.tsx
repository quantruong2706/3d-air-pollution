import { memo } from 'react';
import CityTableRow from './CityTableRow';
import { TableBodyProps } from '@/types/CitiesTableTypes';

const TableBody: React.FC<TableBodyProps> = memo(({ cities, activeLayer, isTopCities = false }) => {
  return (
    <tbody>
      {cities.map((city, index) => (
        <CityTableRow
          key={isTopCities ? index + 1 : city.id}
          city={city}
          activeLayer={activeLayer}
          idCity={isTopCities ? index + 1 : city.id}
        />
      ))}
    </tbody>
  );
});

export default TableBody;
