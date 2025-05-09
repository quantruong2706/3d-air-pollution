import { useMemo } from 'react';
import { pollutionTypes } from '@/constants/aqi';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { CitiesTableProps } from '@/types/CitiesTableTypes';

export const CitiesTable: React.FC<CitiesTableProps> = ({ data, activeLayer }) => {
  const activeLayerLabel = useMemo(() => {
    const pollutionType = pollutionTypes.find(type => type.value === activeLayer);
    return pollutionType?.label || activeLayer.toUpperCase();
  }, [activeLayer]);

  return (
    <>
      <table className="w-full text-sm">
        <TableHeader activeLayerLabel={activeLayerLabel} />
        <TableBody cities={data} activeLayer={activeLayer} />
      </table>
    </>
  );
};
