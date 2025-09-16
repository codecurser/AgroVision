import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  WifiOff, 
  Thermometer, 
  Droplets, 
  Gauge, 
  Battery,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SensorReading {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  batteryLevel: number;
  lastUpdate: string;
  readings: {
    temperature: number;
    moisture: number;
    ph: number;
  };
}

export const IoTSensorDashboard = () => {
  const [sensors, setSensors] = useState<SensorReading[]>([
    {
      id: 'esp001',
      name: 'Field Sensor A',
      location: 'North Field',
      status: 'online',
      batteryLevel: 87,
      lastUpdate: '2 min ago',
      readings: {
        temperature: 28.5,
        moisture: 45,
        ph: 6.8
      }
    },
    {
      id: 'esp002',
      name: 'Field Sensor B',
      location: 'South Field',
      status: 'online',
      batteryLevel: 92,
      lastUpdate: '1 min ago',
      readings: {
        temperature: 29.2,
        moisture: 38,
        ph: 6.5
      }
    },
    {
      id: 'esp003',
      name: 'Greenhouse Sensor',
      location: 'Greenhouse 1',
      status: 'warning',
      batteryLevel: 23,
      lastUpdate: '15 min ago',
      readings: {
        temperature: 32.1,
        moisture: 78,
        ph: 7.2
      }
    },
    {
      id: 'esp004',
      name: 'Water Tank Sensor',
      location: 'Storage Area',
      status: 'offline',
      batteryLevel: 8,
      lastUpdate: '2 hours ago',
      readings: {
        temperature: 25.0,
        moisture: 0,
        ph: 7.0
      }
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-destructive" />;
      default:
        return <Wifi className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success/10 text-success-foreground border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning-foreground border-warning/20';
      case 'offline':
        return 'bg-destructive/10 text-destructive-foreground border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-success';
    if (level > 20) return 'text-warning';
    return 'text-destructive';
  };

  const getOptimalRange = (type: string, value: number) => {
    switch (type) {
      case 'temperature':
        return value >= 20 && value <= 35;
      case 'moisture':
        return value >= 30 && value <= 70;
      case 'ph':
        return value >= 6.0 && value <= 7.5;
      default:
        return true;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => {
        if (sensor.status === 'online') {
          return {
            ...sensor,
            readings: {
              temperature: sensor.readings.temperature + (Math.random() - 0.5) * 0.5,
              moisture: Math.max(0, Math.min(100, sensor.readings.moisture + (Math.random() - 0.5) * 2)),
              ph: Math.max(0, Math.min(14, sensor.readings.ph + (Math.random() - 0.5) * 0.1))
            },
            lastUpdate: 'Just now'
          };
        }
        return sensor;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Wifi className="h-6 w-6 text-primary" />
          IoT Sensor Network
        </h2>
        <Badge variant="outline">
          {sensors.filter(s => s.status === 'online').length} / {sensors.length} Online
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensors.map((sensor) => (
          <Card key={sensor.id} className="shadow-earth hover:shadow-crop transition-all duration-300 animate-grow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{sensor.name}</CardTitle>
                {getStatusIcon(sensor.status)}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {sensor.location}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Battery */}
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(sensor.status)}>
                  {sensor.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Battery className={`h-4 w-4 ${getBatteryColor(sensor.batteryLevel)}`} />
                  <span className={getBatteryColor(sensor.batteryLevel)}>
                    {sensor.batteryLevel}%
                  </span>
                </div>
              </div>

              {/* Sensor Readings */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-warning" />
                    <span className="text-sm">Temp</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-medium ${getOptimalRange('temperature', sensor.readings.temperature) ? 'text-success' : 'text-warning'}`}>
                      {sensor.readings.temperature.toFixed(1)}°C
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-info" />
                      <span className="text-sm">Moisture</span>
                    </div>
                    <span className={`font-medium ${getOptimalRange('moisture', sensor.readings.moisture) ? 'text-success' : 'text-warning'}`}>
                      {sensor.readings.moisture.toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={sensor.readings.moisture} 
                    className="h-2" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    <span className="text-sm">pH</span>
                  </div>
                  <span className={`font-medium ${getOptimalRange('ph', sensor.readings.ph) ? 'text-success' : 'text-warning'}`}>
                    {sensor.readings.ph.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
                <Clock className="h-3 w-3" />
                Last update: {sensor.lastUpdate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-crop/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Sensors</p>
                <p className="text-2xl font-bold text-success">
                  {sensors.filter(s => s.status === 'online').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-sky/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/20 rounded-lg">
                <Droplets className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Moisture</p>
                <p className="text-2xl font-bold text-info">
                  {Math.round(sensors.reduce((acc, s) => acc + s.readings.moisture, 0) / sensors.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-harvest/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Thermometer className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Temperature</p>
                <p className="text-2xl font-bold text-warning">
                  {(sensors.reduce((acc, s) => acc + s.readings.temperature, 0) / sensors.length).toFixed(1)}°C
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};