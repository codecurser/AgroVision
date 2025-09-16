import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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
  CloudRain
} from 'lucide-react';

interface SoilData {
  soil_ph: number;
  moisture: number;
  temperature_c: number;
  rainfall_mm: number;
  region: string;
  season: string;
}

interface CropRecommendation {
  crop: string;
  confidence: number;
  suitability_score: number;
  fertilizer_suggestion: string;
  notes: string;
}

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

  const analyzeAndRecommend = async () => {
    setIsAnalyzing(true);
    
    // Simulate ML prediction with realistic agricultural logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations: CropRecommendation[] = [
      {
        crop: 'Rice',
        confidence: 92,
        suitability_score: 88,
        fertilizer_suggestion: 'NPK 20:10:10 at 200kg/hectare',
        notes: 'Ideal moisture and temperature conditions for rice cultivation'
      },
      {
        crop: 'Wheat',
        confidence: 78,
        suitability_score: 75,
        fertilizer_suggestion: 'Urea 46% at 150kg/hectare',
        notes: 'Good soil pH, consider supplemental irrigation'
      },
      {
        crop: 'Sugarcane',
        confidence: 85,
        suitability_score: 82,
        fertilizer_suggestion: 'Complex fertilizer 12:32:16 at 300kg/hectare',
        notes: 'Excellent moisture levels, optimal for sugarcane growth'
      }
    ];

    setRecommendations(mockRecommendations);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Crop recommendations generated successfully",
    });
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
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3 hover:shadow-crop transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{rec.crop}</h3>
                      <Badge variant="secondary" className="bg-gradient-crop text-success-foreground">
                        {rec.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Suitability Score</span>
                        <span className="font-medium">{rec.suitability_score}/100</span>
                      </div>
                      <Progress value={rec.suitability_score} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Fertilizer Recommendation:</p>
                      <p className="text-sm text-muted-foreground">{rec.fertilizer_suggestion}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Notes:</p>
                      <p className="text-sm text-muted-foreground">{rec.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};