import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CropAdvisor } from "@/components/CropAdvisor";
import { WeatherWidget } from "@/components/WeatherWidget";
import { IoTSensorDashboard } from "@/components/IoTSensorDashboard";
import { 
  Leaf, 
  Cloud, 
  Cpu, 
  TrendingUp, 
  Users, 
  Target,
  ChevronRight,
  Sprout,
  Droplets,
  Sun,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Award,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("crop-advisor");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/10">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-success/6 to-info/8" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-success/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)/0.05,transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-12 animate-fade-in">
              {/* Professional Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-gradient-earth rounded-full animate-pulse" />
                <Leaf className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm tracking-wide">
                  NEXT-GENERATION AGRICULTURE PLATFORM
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-8">
                <h1 className="text-6xl lg:text-8xl font-black text-foreground leading-[0.9] tracking-tight">
                  <span className="block">Smart</span>
                  <span className="block bg-gradient-to-r from-primary via-primary-glow to-success bg-clip-text text-transparent">
                    Farming
                  </span>
                  <span className="block text-5xl lg:text-6xl font-bold text-muted-foreground/80">
                    Revolution
                  </span>
                </h1>
                
                <div className="max-w-2xl">
                  <p className="text-2xl lg:text-3xl text-muted-foreground/90 leading-relaxed font-light">
                    Transform agriculture with 
                    <span className="text-primary font-semibold"> AI-powered insights</span>, 
                    <span className="text-success font-semibold"> real-time monitoring</span>, and
                    <span className="text-info font-semibold"> predictive analytics</span>
                  </p>
                </div>
              </div>
              
              {/* Professional CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Button 
                  size="lg" 
                  className="group relative h-16 px-10 text-xl font-bold bg-gradient-earth hover:shadow-glow transition-all duration-500 overflow-hidden"
                  onClick={() => setActiveTab("crop-advisor")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center gap-3">
                    Start Smart Farming
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="h-16 px-8 text-xl font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/5 backdrop-blur-sm transition-all duration-300"
                  onClick={() => setActiveTab("sensors")}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Explore Dashboard
                </Button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gradient-to-r from-transparent via-border to-transparent">
                <div className="text-center group">
                  <div className="text-4xl lg:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    98%
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">Prediction Accuracy</div>
                  <div className="text-xs text-muted-foreground">ML-Powered</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl lg:text-5xl font-black text-success mb-2 group-hover:scale-110 transition-transform duration-300">
                    50K+
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">Active Farmers</div>
                  <div className="text-xs text-muted-foreground">Global Network</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl lg:text-5xl font-black text-info mb-2 group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">Live Monitoring</div>
                  <div className="text-xs text-muted-foreground">IoT Sensors</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative lg:pl-12">
              {/* Enhanced Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-success/10 to-info/15 rounded-[3rem] blur-3xl animate-pulse-glow scale-105" />
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-success/20 rounded-[3rem] blur-2xl opacity-50" />
              
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img 
                    src={heroImage} 
                    alt="Advanced Smart Agriculture Technology Dashboard" 
                    className="w-full h-auto animate-float hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* Floating Status Cards */}
                <div className="absolute -bottom-8 -left-8 bg-card/95 border border-success/20 rounded-2xl p-6 shadow-crop backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-success rounded-full animate-pulse shadow-glow" />
                    <div>
                      <div className="text-sm font-bold text-foreground">System Status</div>
                      <div className="text-xs text-success font-semibold">All Systems Active</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-card/95 border border-primary/20 rounded-2xl p-4 shadow-earth backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-earth rounded-full flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground">AI Processing</div>
                      <div className="text-sm font-bold text-primary">Real-time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 px-6 bg-gradient-to-br from-card/30 to-secondary/10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Advanced Technology Stack
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-earth bg-clip-text text-transparent">
              Precision Agriculture at Scale
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our AI-powered platform integrates cutting-edge technologies to revolutionize 
              farm management, increase yields, and reduce environmental impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <Card className="group relative overflow-hidden border-0 shadow-earth hover:shadow-glow transition-all duration-500 bg-gradient-to-br from-card to-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative pb-6 pt-8">
                <div className="w-16 h-16 bg-gradient-earth rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl mb-3">AI Crop Intelligence</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Machine learning algorithms process thousands of data points to deliver 
                  personalized crop recommendations with 98% accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center text-sm text-primary font-medium">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Advanced Analytics
                </div>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-0 shadow-earth hover:shadow-glow transition-all duration-500 bg-gradient-to-br from-card to-info/5">
              <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative pb-6 pt-8">
                <div className="w-16 h-16 bg-gradient-sky rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="w-8 h-8 text-info" />
                </div>
                <CardTitle className="text-2xl mb-3">Weather Intelligence</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Hyper-local weather forecasting and climate pattern analysis 
                  to optimize planting, irrigation, and harvesting schedules.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center text-sm text-info font-medium">
                  <Globe className="w-4 h-4 mr-2" />
                  Real-time Updates
                </div>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-0 shadow-earth hover:shadow-glow transition-all duration-500 bg-gradient-to-br from-card to-success/5">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative pb-6 pt-8">
                <div className="w-16 h-16 bg-gradient-crop rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-8 h-8 text-success-foreground" />
                </div>
                <CardTitle className="text-2xl mb-3">IoT Sensor Network</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Wireless sensor deployment across fields providing continuous 
                  monitoring of soil health, moisture, and environmental conditions.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center text-sm text-success font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  24/7 Monitoring
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-24 px-6 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6">
              <Target className="w-4 h-4 mr-2" />
              Integrated Dashboard
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Your Command Center for
              <span className="text-primary block">Smart Agriculture</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Monitor, analyze, and optimize every aspect of your farming operations 
              from one comprehensive, AI-powered dashboard.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 h-16 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-2">
                <TabsTrigger 
                  value="crop-advisor" 
                  className="flex items-center gap-3 text-base font-medium h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-earth transition-all duration-300"
                >
                  <Sprout className="w-5 h-5" />
                  AI Crop Advisory
                </TabsTrigger>
                <TabsTrigger 
                  value="weather" 
                  className="flex items-center gap-3 text-base font-medium h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-earth transition-all duration-300"
                >
                  <Sun className="w-5 h-5" />
                  Weather Intelligence
                </TabsTrigger>
                <TabsTrigger 
                  value="sensors" 
                  className="flex items-center gap-3 text-base font-medium h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-earth transition-all duration-300"
                >
                  <Droplets className="w-5 h-5" />
                  IoT Monitoring
                </TabsTrigger>
              </TabsList>

              <TabsContent value="crop-advisor" className="mt-12 animate-fade-in">
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-earth p-2">
                  <CropAdvisor />
                </div>
              </TabsContent>
              
              <TabsContent value="weather" className="mt-12 animate-fade-in">
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-earth p-2">
                  <WeatherWidget />
                </div>
              </TabsContent>
              
              <TabsContent value="sensors" className="mt-12 animate-fade-in">
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-earth p-2">
                  <IoTSensorDashboard />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Stats & Results Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/5 via-success/5 to-info/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)/0.1,transparent)]" />
        <div className="container mx-auto relative">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6">
              <Award className="w-4 h-4 mr-2" />
              Global Impact
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Transforming Agriculture
              <span className="text-primary block">Worldwide</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join the agricultural revolution and see measurable improvements in 
              productivity, sustainability, and profitability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-crop hover:shadow-glow transition-all duration-500 group">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-xl font-semibold text-foreground mb-2">Prediction Accuracy</div>
                <div className="text-muted-foreground">ML-powered crop recommendations</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-crop hover:shadow-glow transition-all duration-500 group">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl lg:text-6xl font-bold text-success mb-4 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-xl font-semibold text-foreground mb-2">Active Farmers</div>
                <div className="text-muted-foreground">Across 35+ countries</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-crop hover:shadow-glow transition-all duration-500 group">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl lg:text-6xl font-bold text-info mb-4 group-hover:scale-110 transition-transform duration-300">42%</div>
                <div className="text-xl font-semibold text-foreground mb-2">Yield Increase</div>
                <div className="text-muted-foreground">Average improvement rate</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-crop hover:shadow-glow transition-all duration-500 group">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl lg:text-6xl font-bold text-warning mb-4 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-xl font-semibold text-foreground mb-2">Monitoring</div>
                <div className="text-muted-foreground">Real-time IoT sensors</div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <Card className="inline-block bg-gradient-earth border-0 shadow-glow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                  Ready to Transform Your Farm?
                </h3>
                <p className="text-primary-foreground/90 mb-6 max-w-md">
                  Join thousands of successful farmers already using our platform.
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="h-12 px-8 text-lg font-semibold"
                  onClick={() => setActiveTab("crop-advisor")}
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-br from-card to-secondary/20 border-t border-border/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-earth rounded-2xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-earth bg-clip-text text-transparent">
                SmartFarm Pro
              </span>
            </div>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionizing agriculture through intelligent technology, sustainable practices, 
              and data-driven insights for the farms of tomorrow.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                <TrendingUp className="w-8 h-8 text-primary mb-3" />
                <div className="font-semibold mb-1">Advanced Analytics</div>
                <div className="text-sm text-muted-foreground text-center">
                  AI-powered insights for optimal decision making
                </div>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-2xl bg-success/5 hover:bg-success/10 transition-colors duration-300">
                <Users className="w-8 h-8 text-success mb-3" />
                <div className="font-semibold mb-1">Global Network</div>
                <div className="text-sm text-muted-foreground text-center">
                  Connect with farmers worldwide
                </div>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-2xl bg-info/5 hover:bg-info/10 transition-colors duration-300">
                <Target className="w-8 h-8 text-info mb-3" />
                <div className="font-semibold mb-1">Precision Farming</div>
                <div className="text-sm text-muted-foreground text-center">
                  Maximize efficiency with targeted approaches
                </div>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-2xl bg-warning/5 hover:bg-warning/10 transition-colors duration-300">
                <Shield className="w-8 h-8 text-warning mb-3" />
                <div className="font-semibold mb-1">Sustainable Future</div>
                <div className="text-sm text-muted-foreground text-center">
                  Environmentally conscious farming solutions
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-border/50">
            <p className="text-muted-foreground">
              © 2024 SmartFarm Pro. Cultivating the future of agriculture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;