import { useMemo } from 'react';
import { pollutionTypes } from '@/constants/aqi';
import SortControls from '../../common/SortControls';
import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
import { CitiesTableProps } from '@/types/CitiesTableTypes';

export const CitiesTable: React.FC<CitiesTableProps> = ({
  data,
  activeLayer,
  sortBy,
  onToggleSort,
}) => {
  const activeLayerLabel = useMemo(() => {
    const pollutionType = pollutionTypes.find(type => type.value === activeLayer);
    return pollutionType?.label || activeLayer.toUpperCase();
  }, [activeLayer]);

  const sortedCities = useMemo(() => {
    if (!data.length) return [];

    return [...data].sort((a, b) => {
      if (sortBy === 'id') {
        return parseInt(a.id) - parseInt(b.id);
      }
      return a.location.name.localeCompare(b.location.name);
    });
  }, [data, sortBy]);

  return (
    <>
      <SortControls sortBy={sortBy} onToggleSort={onToggleSort} />
      <table className="w-full text-sm">
        <TableHeader activeLayerLabel={activeLayerLabel} />
        <TableBody cities={sortedCities} activeLayer={activeLayer} />
      </table>
    </>
  );
};
