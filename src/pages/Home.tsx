import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { usePollutionStore } from '@/stores/pollutionDataStore';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const HomePage = () => {
  // Local state for UI elements
  const [viewingMode, setViewingMode] = useState<string>('global');

  // Get state and actions from pollution store
  const {
    pollutionData,
    activeLayer,
    threshold,
    isLoading,
    error,
    setActiveLayer,
    setThreshold,
    fetchPollutionData,
    clearError,
  } = usePollutionStore();

  // Fetch pollution data on component mount
  useEffect(() => {
    fetchPollutionData();
  }, [fetchPollutionData]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">3D Air Pollution Map</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={clearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main visualization area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Visualization</CardTitle>
              <CardDescription>
                Explore air pollution data in an interactive 3D environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 rounded-lg h-[400px] flex items-center justify-center border relative">
                {isLoading ? (
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
                    <p className="text-muted-foreground">Loading pollution data...</p>
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <h3 className="text-xl font-medium mb-2">3D Visualization Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      Currently showing {activeLayer.toUpperCase()} data with threshold at{' '}
                      {threshold}%
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => setViewingMode('global')}
                        variant={viewingMode === 'global' ? 'default' : 'outline'}
                      >
                        Global View
                      </Button>
                      <Button
                        onClick={() => setViewingMode('regional')}
                        variant={viewingMode === 'regional' ? 'default' : 'outline'}
                      >
                        Regional View
                      </Button>
                    </div>

                    {/* Basic data display */}
                    {pollutionData.length > 0 ? (
                      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        {pollutionData.map(point => (
                          <div key={point.id} className="bg-card p-3 rounded-md shadow-sm border">
                            <h4 className="font-medium text-sm">{point.location.name}</h4>
                            <p
                              className={`text-lg font-bold ${
                                Number(point.readings[activeLayer as keyof typeof point.readings]) >
                                threshold
                                  ? 'text-destructive'
                                  : 'text-green-500'
                              }`}
                            >
                              {point.readings[activeLayer as keyof typeof point.readings]}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activeLayer.toUpperCase()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 p-4 border border-dashed rounded-md max-w-md mx-auto">
                        <p className="text-muted-foreground">No pollution data available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Visualization Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pollution Threshold</h3>
                <Slider
                  defaultValue={[threshold]}
                  max={100}
                  step={1}
                  value={[threshold]}
                  onValueChange={([value]) => setThreshold(value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>{threshold}%</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Data Layers</h3>
                <Tabs
                  defaultValue={activeLayer}
                  value={activeLayer}
                  onValueChange={v => setActiveLayer(v as 'pm25' | 'pm10' | 'no2' | 'o3')}
                >
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="pm25">PM2.5</TabsTrigger>
                    <TabsTrigger value="pm10">PM10</TabsTrigger>
                    <TabsTrigger value="no2">NO2</TabsTrigger>
                    <TabsTrigger value="o3">O3</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => fetchPollutionData()} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Refresh Data'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>About Air Pollution</CardTitle>
            <CardDescription>Understanding air quality data and its impact</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Air pollution is the contamination of air by harmful substances like particulate
              matter, nitrogen dioxide, and ozone, which can have severe health impacts on humans
              and the environment.
            </p>
            <p>
              Our visualization tool helps you understand air pollution patterns and trends across
              different regions, allowing for better decision-making and awareness about air quality
              issues.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
