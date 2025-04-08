
import React, { useState, useEffect } from 'react';
import { Cloud, CloudSun, CloudMoon, Sun, CloudRain, Loader } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    location: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Mock weather data - in a real app, this would be an API call
    const fetchMockWeather = () => {
      setLoading(true);
      // Simulate network request
      setTimeout(() => {
        const mockWeather = {
          temp: Math.floor(Math.random() * 15) + 15, // Random temp between 15-30°C
          condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
          location: 'Your Location' // This would be based on geolocation or user preferences
        };
        setWeather(mockWeather);
        setLoading(false);
      }, 1000);
    };

    fetchMockWeather();
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-8 w-8 text-muted-foreground" />;
    
    switch(weather.condition) {
      case 'Sunny':
        return <Sun className="h-8 w-8 text-amber-400" />;
      case 'Partly Cloudy':
        return <CloudSun className="h-8 w-8 text-blue-400" />;
      case 'Cloudy':
        return <CloudMoon className="h-8 w-8 text-gray-400" />;
      case 'Rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-muted-foreground" />;
    }
  };

  return (
    <Card className="bg-white/70 dark:bg-card/70 backdrop-blur-md border-none shadow-lg rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-babyPink/30 to-babyBlue/30 dark:from-primary/20 dark:to-blue-700/20 z-0"></div>
      <CardContent className="p-4 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Couldn't load weather data</p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/70">{weather?.location}</p>
              <div className="flex items-center mt-1 space-x-2">
                <span className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">{weather?.temp}°C</span>
                <span className="text-sm font-medium text-foreground/80">{weather?.condition}</span>
              </div>
            </div>
            <div className="bg-white/60 dark:bg-background/50 p-3 rounded-full shadow-inner">
              {getWeatherIcon()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
