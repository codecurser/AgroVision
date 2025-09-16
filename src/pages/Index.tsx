import { useState } from 'react';
import { CropAdvisor } from '@/components/CropAdvisor';
import { WeatherWidget } from '@/components/WeatherWidget';
import { IoTSensorDashboard } from '@/components/IoTSensorDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import heroImage from '@/assets/hero-agriculture.jpg';
import dashboardIcons from '@/assets/dashboard-icons.jpg';
import { 
  Sprout, 
  CloudSun, 
  Wifi, 
  BarChart3, 
  Leaf,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('advisor');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sprout className="h-12 w-12 text-success animate-float" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              Smart Agriculture
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered crop advisory system with IoT sensors, weather integration, and machine learning recommendations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => setActiveTab('advisor')}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Get Crop Recommendations
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => setActiveTab('sensors')}
            >
              <Wifi className="h-5 w-5 mr-2" />
              View Sensor Data
            </Button>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Agricultural Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combining IoT sensors, weather data, and machine learning to optimize crop yields and farming decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-earth hover:shadow-crop transition-all duration-300 animate-grow">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-crop/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">ML Crop Recommendations</h3>
                <p className="text-muted-foreground">
                  Get AI-powered crop suggestions based on soil analysis, weather patterns, and regional factors
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-earth hover:shadow-crop transition-all duration-300 animate-grow">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-sky/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CloudSun className="h-8 w-8 text-info" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Weather Integration</h3>
                <p className="text-muted-foreground">
                  Real-time weather data and forecasts to optimize irrigation and farming operations
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-earth hover:shadow-crop transition-all duration-300 animate-grow">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-earth/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Wifi className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">IoT Sensor Network</h3>
                <p className="text-muted-foreground">
                  Monitor soil conditions, temperature, and moisture levels in real-time across your fields
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="advisor" className="flex items-center gap-2">
                <Sprout className="h-4 w-4" />
                Crop Advisor
              </TabsTrigger>
              <TabsTrigger value="weather" className="flex items-center gap-2">
                <CloudSun className="h-4 w-4" />
                Weather
              </TabsTrigger>
              <TabsTrigger value="sensors" className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                IoT Sensors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="advisor" className="space-y-8">
              <CropAdvisor />
            </TabsContent>

            <TabsContent value="weather" className="space-y-8">
              <WeatherWidget />
            </TabsContent>

            <TabsContent value="sensors" className="space-y-8">
              <IoTSensorDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-earth text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Empowering Modern Agriculture
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold">92%</div>
              <div className="text-primary-foreground/80">Accuracy Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-primary-foreground/80">Farmers Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">25%</div>
              <div className="text-primary-foreground/80">Yield Increase</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-primary-foreground/80">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-card border-t">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sprout className="h-6 w-6 text-success" />
            <span className="text-xl font-bold">Smart Crop Advisory System</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Revolutionizing agriculture through AI, IoT, and data-driven insights
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Secure & Reliable
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Community Driven
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Data-Powered
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
