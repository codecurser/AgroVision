import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  Eye,
  Gauge
} from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
  }[];
}

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Farm Location',
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    condition: 'sunny',
    forecast: [
      { day: 'Today', high: 32, low: 22, condition: 'sunny' },
      { day: 'Tomorrow', high: 29, low: 20, condition: 'cloudy' },
      { day: 'Wed', high: 26, low: 18, condition: 'rainy' },
      { day: 'Thu', high: 31, low: 23, condition: 'sunny' },
      { day: 'Fri', high: 28, low: 19, condition: 'cloudy' },
    ]
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-warning" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-muted-foreground" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-info" />;
      default:
        return <Sun className="h-6 w-6 text-warning" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'bg-warning/10 text-warning-foreground border-warning/20';
      case 'cloudy':
        return 'bg-muted text-muted-foreground border-muted';
      case 'rainy':
        return 'bg-info/10 text-info-foreground border-info/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Card className="shadow-glow animate-grow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(weatherData.condition)}
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-gradient-sky">
            <Thermometer className="h-5 w-5 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-sm text-muted-foreground">Temperature</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-info/5">
            <Droplets className="h-5 w-5 mx-auto mb-2 text-info" />
            <p className="text-2xl font-bold">{weatherData.humidity}%</p>
            <p className="text-sm text-muted-foreground">Humidity</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Wind className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{weatherData.windSpeed}</p>
            <p className="text-sm text-muted-foreground">km/h Wind</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-accent/50">
            <Gauge className="h-5 w-5 mx-auto mb-2 text-accent-foreground" />
            <p className="text-2xl font-bold">{weatherData.pressure}</p>
            <p className="text-sm text-muted-foreground">hPa</p>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="space-y-3">
          <h3 className="font-semibold">5-Day Forecast</h3>
          <div className="grid grid-cols-5 gap-2">
            {weatherData.forecast.map((day, index) => (
              <div 
                key={index} 
                className="text-center p-3 rounded-lg bg-card border hover:shadow-md transition-all duration-300"
              >
                <p className="text-sm font-medium mb-2">{day.day}</p>
                {getWeatherIcon(day.condition)}
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-bold">{day.high}°</p>
                  <p className="text-xs text-muted-foreground">{day.low}°</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`mt-2 text-xs ${getConditionColor(day.condition)}`}
                >
                  {day.condition}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Agricultural Advisory */}
        <div className="p-4 bg-gradient-crop/10 rounded-lg border border-success/20">
          <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Agricultural Advisory
          </h4>
          <p className="text-sm text-muted-foreground">
            Optimal conditions for field operations. Consider irrigation scheduling based on upcoming weather patterns.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};