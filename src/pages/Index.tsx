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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
        <div className="relative">
          <div className="container mx-auto px-6 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-6">
                  <Badge variant="secondary" className="w-fit px-4 py-2 text-sm font-medium">
                    <Leaf className="w-4 h-4 mr-2" />
                    Next-Gen Agriculture Platform
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                    Smart Farming
                    <span className="text-primary block bg-gradient-earth bg-clip-text text-transparent">
                      Made Simple
                    </span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                    Transform your agricultural operations with AI-powered crop recommendations, 
                    real-time IoT monitoring, and predictive weather analytics.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="group h-14 px-8 text-lg font-semibold shadow-earth hover:shadow-glow transition-all duration-300"
                    onClick={() => setActiveTab("crop-advisor")}
                  >
                    Start Smart Farming
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="h-14 px-8 text-lg border-2 hover:bg-primary/5"
                    onClick={() => setActiveTab("sensors")}
                  >
                    Explore Dashboard
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">50K+</div>
                    <div className="text-sm text-muted-foreground">Farmers Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-info">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                </div>
              </div>
              
              <div className="relative lg:pl-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-success/10 to-info/10 rounded-3xl blur-3xl animate-pulse-glow" />
                <div className="relative">
                  <img 
                    src={heroImage} 
                    alt="Smart Agriculture Technology in Action" 
                    className="relative rounded-3xl shadow-2xl w-full h-auto animate-float hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-card border border-border/50 rounded-2xl p-4 shadow-crop backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Live Monitoring Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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