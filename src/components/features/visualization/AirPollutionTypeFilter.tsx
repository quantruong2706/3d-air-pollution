import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PollutionType, usePollutionStore } from '@/stores/pollutionDataStore';
import { useAnimateIn } from '@/lib/hooks/useAnimateIn';
import { pollutionTypes } from '@/constants/aqi';

export function AirPollutionTypeFilter(): JSX.Element {
  const activeLayer = usePollutionStore(state => state.activeLayer);
  const setActiveLayer = usePollutionStore(state => state.setActiveLayer);

  const { animationStyles } = useAnimateIn({
    direction: 'top',
    duration: 600,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    centerHorizontally: true,
  });

  const handleTypeChange = (type: PollutionType): void => {
    setActiveLayer(type);
  };

  return (
    <Card
      className="absolute top-0 left-1/2 w-[350px] z-10 mt-4 opacity-80"
      style={animationStyles}
    >
      <CardHeader className="flex flex-col items-center">
        <CardTitle>AIR POLLUTION</CardTitle>
        <CardDescription>Filter according to polluted gas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {pollutionTypes.map(type => (
            <button
              key={type.value}
              onClick={() => handleTypeChange(type.value)}
              className={`
                py-2 px-3 rounded-md text-center border-2 transition-all duration-200 
                shadow-sm hover:shadow-md bg-gray-100 text-gray-950
                ${activeLayer === type.value ? 'border-red-600' : 'border-transparent'}
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
