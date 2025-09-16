import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CropMLService, SoilData, CropRecommendation } from '@/services/CropMLService';
import { 
  Sprout, 
  Thermometer, 
  Droplets, 
  Gauge, 
  MapPin, 
  Calendar,
  Mic,
  MicOff,
  TrendingUp,
  Leaf,
  Sun,
  CloudRain,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

export const CropAdvisor = () => {
  const { toast } = useToast();
  const [soilData, setSoilData] = useState<SoilData>({
    soil_ph: 6.5,
    moisture: 25,
    temperature_c: 28,
    rainfall_mm: 120,
    region: 'north',
    season: 'kharif'
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mlService] = useState(() => CropMLService.getInstance());

  const analyzeAndRecommend = async () => {
    setIsAnalyzing(true);
    
    try {
      toast({
        title: "Initializing ML Model",
        description: "Loading agricultural intelligence...",
      });

      // Use the real ML service for predictions
      const mlRecommendations = await mlService.predictCrops(soilData);
      
      setRecommendations(mlRecommendations);
      
      toast({
        title: "ML Analysis Complete",
        description: `Generated ${mlRecommendations.length} crop recommendations`,
      });
    } catch (error) {
      console.error('ML prediction failed:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startVoiceInput = () => {
    setIsListening(true);
    
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        // Simple voice command parsing
        if (transcript.includes('ph') || transcript.includes('acidity')) {
          const phMatch = transcript.match(/(\d+\.?\d*)/);
          if (phMatch) {
            setSoilData(prev => ({ ...prev, soil_ph: parseFloat(phMatch[1]) }));
          }
        }
        
        setIsListening(false);
        toast({
          title: "Voice Input Received",
          description: `Processed: "${transcript}"`,
        });
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Input Error",
          description: "Please try again or use manual input",
          variant: "destructive"
        });
      };

      recognition.start();
    } else {
      setIsListening(false);
      toast({
        title: "Voice Not Supported",
        description: "Please use manual input",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sprout className="h-8 w-8 text-success animate-float" />
          <h1 className="text-4xl font-bold bg-gradient-earth bg-clip-text text-transparent">
            Smart Crop Advisory
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered crop recommendations based on soil analysis, weather data, and regional factors
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Soil Analysis Input */}
        <Card className="shadow-earth animate-grow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" />
              Soil Analysis
            </CardTitle>
            <CardDescription>
              Enter your soil and environmental parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ph" className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Soil pH
                </Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  value={soilData.soil_ph}
                  onChange={(e) => setSoilData(prev => ({ ...prev, soil_ph: parseFloat(e.target.value) }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="moisture" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-info" />
                  Moisture (%)
                </Label>
                <Input
                  id="moisture"
                  type="number"
                  min="0"
                  max="100"
                  value={soilData.moisture}
                  onChange={(e) => setSoilData(prev => ({ ...prev, moisture: parseInt(e.target.value) }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-warning" />
                  Temperature (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  value={soilData.temperature_c}
                  onChange={(e) => setSoilData(prev => ({ ...prev, temperature_c: parseInt(e.target.value) }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rainfall" className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-info" />
                  Rainfall (mm)
                </Label>
                <Input
                  id="rainfall"
                  type="number"
                  value={soilData.rainfall_mm}
                  onChange={(e) => setSoilData(prev => ({ ...prev, rainfall_mm: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Region
                </Label>
                <select
                  id="region"
                  value={soilData.region}
                  onChange={(e) => setSoilData(prev => ({ ...prev, region: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="central">Central</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="season" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Season
                </Label>
                <select
                  id="season"
                  value={soilData.season}
                  onChange={(e) => setSoilData(prev => ({ ...prev, season: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="kharif">Kharif (Summer)</option>
                  <option value="rabi">Rabi (Winter)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={analyzeAndRecommend} 
                disabled={isAnalyzing}
                variant="hero"
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    Get Recommendations
                  </>
                )}
              </Button>
              
              <Button
                onClick={startVoiceInput}
                disabled={isListening}
                variant="outline"
                size="icon"
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 text-destructive animate-pulse" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-crop animate-grow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              Crop Recommendations
            </CardTitle>
            <CardDescription>
              AI-powered suggestions based on your soil analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recommendations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Sprout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Analyze your soil to get crop recommendations</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="p-6 border-2 hover:shadow-crop transition-all duration-300 animate-grow">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <Sprout className="h-6 w-6 text-success" />
                          {rec.crop}
                        </h3>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-gradient-crop text-success-foreground">
                            {rec.confidence}% confidence
                          </Badge>
                          <Badge 
                            variant={rec.suitability_score >= 80 ? "default" : rec.suitability_score >= 60 ? "secondary" : "destructive"}
                            className="flex items-center gap-1"
                          >
                            {rec.suitability_score >= 80 ? <CheckCircle className="h-3 w-3" /> : 
                             rec.suitability_score >= 60 ? <Target className="h-3 w-3" /> : 
                             <AlertTriangle className="h-3 w-3" />}
                            {rec.suitability_score >= 80 ? 'Excellent' : 
                             rec.suitability_score >= 60 ? 'Good' : 'Challenging'}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Suitability Score */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Suitability Score</span>
                          <span className="font-bold text-lg">{rec.suitability_score}/100</span>
                        </div>
                        <Progress value={rec.suitability_score} className="h-3" />
                      </div>

                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                          <TabsTrigger value="yield">Yield</TabsTrigger>
                          <TabsTrigger value="risks">Risks</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="details" className="space-y-3 mt-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm leading-relaxed">{rec.notes}</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="fertilizer" className="space-y-3 mt-4">
                          <div className="p-4 bg-gradient-harvest/10 rounded-lg border border-warning/20">
                            <div className="flex items-start gap-2">
                              <Zap className="h-5 w-5 text-warning mt-0.5" />
                              <div>
                                <p className="font-medium text-warning-foreground mb-1">Recommended Fertilizer:</p>
                                <p className="text-sm">{rec.fertilizer_suggestion}</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="yield" className="space-y-3 mt-4">
                          {rec.yield_prediction && (
                            <div className="p-4 bg-gradient-crop/10 rounded-lg border border-success/20">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-success" />
                                <div>
                                  <p className="font-medium text-success-foreground">Expected Yield:</p>
                                  <p className="text-2xl font-bold text-success">
                                    {rec.yield_prediction.toLocaleString()} kg/hectare
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="risks" className="space-y-3 mt-4">
                          {rec.risk_factors && rec.risk_factors.length > 0 ? (
                            <div className="space-y-2">
                              {rec.risk_factors.map((risk, riskIndex) => (
                                <div key={riskIndex} className="p-3 bg-destructive/5 rounded-lg border border-destructive/20 flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                                  <p className="text-sm text-destructive-foreground">{risk}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 bg-success/5 rounded-lg border border-success/20 flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-success" />
                              <p className="text-sm text-success-foreground">No significant risk factors identified</p>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </div>
                  </Card>
                ))}
                
                {/* ML Model Info */}
                <div className="mt-6 p-4 bg-gradient-earth/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-primary-foreground">AI-Powered Analysis</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommendations generated using advanced machine learning algorithms trained on agricultural data, 
                    soil science, and regional growing patterns. Confidence scores reflect model certainty based on input parameters.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};