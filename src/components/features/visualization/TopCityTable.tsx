import { useMemo } from 'react';
import { pollutionTypes } from '@/constants/aqi';
import { PollutionDataPoint, PollutionType } from '@/types/3dVisualization';
import TableHeader from '@/components/common/TableHeader';
import TableBody from '@/components/common/TableBody';

interface TopCityTableProps {
  readonly data: ReadonlyArray<PollutionDataPoint>;
  readonly title: string;
  readonly activeLayer: PollutionType;
}

const TopCityTable: React.FC<TopCityTableProps> = ({ data, title, activeLayer }) => {
  const activeLayerLabel = useMemo(() => {
    const pollutionType = pollutionTypes.find(type => type.value === activeLayer);
    return pollutionType?.label || activeLayer.toUpperCase();
  }, [activeLayer]);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <table className="w-full text-sm">
        <TableHeader activeLayerLabel={activeLayerLabel} />
        <TableBody cities={data} activeLayer={activeLayer} isTopCities />
      </table>
    </div>
  );
};

export default TopCityTable;
