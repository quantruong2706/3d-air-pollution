import { useEffect, useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePollutionStore } from '@/stores/pollutionDataStore';
import { useAnimateIn } from '@/lib/hooks/useAnimateIn';
import { CitiesTable } from './CitiesTable';
import { SortOption } from '@/types/CitiesTableTypes';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const CityAirPollutionList: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const pollutionData = usePollutionStore(state => state.pollutionData);
  const fetchPollutionData = usePollutionStore(state => state.fetchPollutionData);
  const isLoading = usePollutionStore(state => state.isLoading);
  const error = usePollutionStore(state => state.error);
  const activeLayer = usePollutionStore(state => state.activeLayer);

  const { animationStyles } = useAnimateIn({
    direction: 'right',
    duration: 600,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  });

  const handleFetchData = useCallback(() => {
    if (pollutionData.length === 0 && !isLoading) {
      fetchPollutionData();
    }
  }, [fetchPollutionData, isLoading, pollutionData.length]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleToggleSort = useCallback(() => {
    setSortBy(prevSort => (prevSort === 'name' ? 'id' : 'name'));
  }, []);

  return (
    <Card
      className="absolute top-0 right-0 w-[400px] z-10 mt-4 mr-4 overflow-hidden max-h-[80vh]"
      style={animationStyles}
    >
      <CardHeader className="flex flex-col items-center">
        <CardTitle>LIST ALL CITIES</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[calc(80vh-4rem)]">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <LoadingSpinner text="Loading cities data..." size="small" variant="dark" />
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">Error loading data: {error}</div>
        ) : (
          <CitiesTable
            data={pollutionData}
            activeLayer={activeLayer}
            sortBy={sortBy}
            onToggleSort={handleToggleSort}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CityAirPollutionList;
