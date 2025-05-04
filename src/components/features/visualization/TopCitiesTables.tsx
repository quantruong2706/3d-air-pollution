import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePollutionStore } from '@/stores/pollutionDataStore';
import { useAnimateIn } from '@/lib/hooks/useAnimateIn';
import TopCityTable from './TopCityTable';

const TopCitiesTables: React.FC = () => {
  const pollutionData = usePollutionStore(state => state.pollutionData);
  const activeLayer = usePollutionStore(state => state.activeLayer);
  const isLoading = usePollutionStore(state => state.isLoading);
  const error = usePollutionStore(state => state.error);

  const { animationStyles } = useAnimateIn({
    direction: 'left',
    duration: 600,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  });

  const { mostPollutedCities, cleanestCities } = useMemo(() => {
    if (!pollutionData.length) {
      return {
        mostPollutedCities: [],
        cleanestCities: [],
      };
    }

    const sortedByPollution = [...pollutionData].sort((a, b) => {
      return b.readings[activeLayer] - a.readings[activeLayer];
    });

    return {
      mostPollutedCities: sortedByPollution.slice(0, 10),
      cleanestCities: sortedByPollution.slice(-10).reverse(), // Take last 10 and reverse to show in ascending order
    };
  }, [pollutionData, activeLayer]);

  return (
    <Card
      className="absolute top-0 left-0 w-[300px] z-10 mt-4 ml-4 max-h-[80vh] overflow-hidden"
      style={animationStyles}
    >
      <CardHeader className="py-3">
        <CardTitle className="text-center text-base">TOP CITIES</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[calc(80vh-4rem)]">
        {isLoading ? (
          <div className="p-4 text-center">Loading cities data...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">Error loading data: {error}</div>
        ) : (
          <>
            <TopCityTable
              data={mostPollutedCities}
              title="Most Polluted Cities"
              activeLayer={activeLayer}
            />
            <TopCityTable data={cleanestCities} title="Cleanest Cities" activeLayer={activeLayer} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCitiesTables;
