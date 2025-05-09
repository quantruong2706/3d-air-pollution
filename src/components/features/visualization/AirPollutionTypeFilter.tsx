import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { usePollutionStore } from '@/stores/pollutionDataStore';
import { useAnimateIn } from '@/lib/hooks/useAnimateIn';
import { AQI_LEVELS, pollutionTypes } from '@/constants/aqi';
import { PollutionType } from '@/types/3dVisualization';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AirPollutionTypeFilter = (): JSX.Element => {
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
      <CardHeader>
        <div className="text-sm font-medium mb-2">Air Quality Index (AQI) Levels:</div>
        <div className="relative h-8 rounded-md overflow-hidden">
          <TooltipProvider>
            <div
              className="flex h-full w-full"
              style={{
                background: `linear-gradient(to right, ${AQI_LEVELS.map(level => level.color).join(', ')})`,
              }}
            >
              {AQI_LEVELS.map(level => (
                <Tooltip key={level.key}>
                  <TooltipTrigger asChild>
                    <div className="h-full flex-1 bg-transparent cursor-pointer transition-opacity hover:opacity-80" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <span className="font-medium">{level.label}</span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
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
};

export default AirPollutionTypeFilter;
