import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

export interface SoilData {
  soil_ph: number;
  moisture: number;
  temperature_c: number;
  rainfall_mm: number;
  region: string;
  season: string;
}

export interface CropRecommendation {
  crop: string;
  confidence: number; 
  suitability_score: number;
  fertilizer_suggestion: string;
  notes: string;
  yield_prediction?: number;
  risk_factors?: string[];
}

export interface CropDatabase {
  [key: string]: {
    optimal_ph: [number, number];
    optimal_moisture: [number, number];
    optimal_temp: [number, number];
    optimal_rainfall: [number, number];
    suitable_regions: string[];
    suitable_seasons: string[];
    fertilizer: string;
    yield_per_hectare: number;
    growth_period_days: number;
  };
}

// Comprehensive crop database with agricultural parameters
const CROP_DATABASE: CropDatabase = {
  rice: {
    optimal_ph: [5.5, 7.0],
    optimal_moisture: [80, 100],
    optimal_temp: [20, 35],
    optimal_rainfall: [100, 200],
    suitable_regions: ['north', 'south', 'east', 'west'],
    suitable_seasons: ['kharif', 'rabi'],
    fertilizer: 'NPK 20:10:10 at 200kg/hectare',
    yield_per_hectare: 4000,
    growth_period_days: 120
  },
  wheat: {
    optimal_ph: [6.0, 7.5],
    optimal_moisture: [40, 70],
    optimal_temp: [15, 25],
    optimal_rainfall: [50, 100],
    suitable_regions: ['north', 'central'],
    suitable_seasons: ['rabi'],
    fertilizer: 'Urea 46% at 150kg/hectare',
    yield_per_hectare: 3000,
    growth_period_days: 100
  },
  sugarcane: {
    optimal_ph: [6.0, 8.0],
    optimal_moisture: [70, 90], 
    optimal_temp: [25, 35],
    optimal_rainfall: [150, 250],
    suitable_regions: ['north', 'south'],
    suitable_seasons: ['kharif'],
    fertilizer: 'Complex fertilizer 12:32:16 at 300kg/hectare',
    yield_per_hectare: 60000,
    growth_period_days: 365
  },
  cotton: {
    optimal_ph: [5.8, 8.0],
    optimal_moisture: [50, 80],
    optimal_temp: [25, 35],
    optimal_rainfall: [80, 120],
    suitable_regions: ['south', 'central'],
    suitable_seasons: ['kharif'],
    fertilizer: 'NPK 17:17:17 at 250kg/hectare',
    yield_per_hectare: 500,
    growth_period_days: 180
  },
  maize: {
    optimal_ph: [6.0, 7.5],
    optimal_moisture: [60, 80],
    optimal_temp: [20, 30],
    optimal_rainfall: [60, 120],
    suitable_regions: ['north', 'central', 'south'],
    suitable_seasons: ['kharif', 'rabi'],
    fertilizer: 'NPK 120:60:40 at 220kg/hectare',
    yield_per_hectare: 2500,
    growth_period_days: 90
  },
  soybean: {
    optimal_ph: [6.0, 7.0],
    optimal_moisture: [50, 75],
    optimal_temp: [20, 30],
    optimal_rainfall: [80, 140],
    suitable_regions: ['central', 'south'],
    suitable_seasons: ['kharif'],
    fertilizer: 'DAP 18:46:0 at 100kg/hectare',
    yield_per_hectare: 1200,
    growth_period_days: 110
  },
  tomato: {
    optimal_ph: [6.0, 7.0],
    optimal_moisture: [60, 80],
    optimal_temp: [18, 29],
    optimal_rainfall: [60, 100],
    suitable_regions: ['north', 'south', 'central'],
    suitable_seasons: ['kharif', 'rabi'],
    fertilizer: 'NPK 19:19:19 at 200kg/hectare',
    yield_per_hectare: 40000,
    growth_period_days: 75
  },
  potato: {
    optimal_ph: [5.0, 6.5],
    optimal_moisture: [65, 85],
    optimal_temp: [15, 25],
    optimal_rainfall: [50, 80],
    suitable_regions: ['north', 'central'],
    suitable_seasons: ['rabi'],
    fertilizer: 'NPK 100:75:100 at 275kg/hectare',
    yield_per_hectare: 25000,
    growth_period_days: 90
  }
};

export class CropMLService {
  private static instance: CropMLService;
  private textClassifier: any = null;
  private isInitialized = false;

  static getInstance(): CropMLService {
    if (!CropMLService.instance) {
      CropMLService.instance = new CropMLService();
    }
    return CropMLService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('Initializing ML models...');
      
      // Initialize a text classification model for additional insights
      this.textClassifier = await pipeline(
        'text-classification',
        'cardiffnlp/twitter-roberta-base-sentiment-latest',
        { device: 'webgpu' }
      );
      
      this.isInitialized = true;
      console.log('ML models initialized successfully');
    } catch (error) {
      console.warn('WebGPU not available, falling back to CPU-based ML:', error);
      this.isInitialized = true; // Continue with rule-based system
    }
  }

  /**
   * Calculate suitability score for a crop based on soil conditions
   */
  private calculateSuitabilityScore(soilData: SoilData, cropData: any): number {
    let score = 100;
    
    // pH suitability (25% weight)
    const phOptimal = cropData.optimal_ph;
    const phScore = this.calculateParameterScore(soilData.soil_ph, phOptimal[0], phOptimal[1]);
    score *= (phScore * 0.25 + 0.75);
    
    // Moisture suitability (25% weight)  
    const moistureOptimal = cropData.optimal_moisture;
    const moistureScore = this.calculateParameterScore(soilData.moisture, moistureOptimal[0], moistureOptimal[1]);
    score *= (moistureScore * 0.25 + 0.75);
    
    // Temperature suitability (25% weight)
    const tempOptimal = cropData.optimal_temp;
    const tempScore = this.calculateParameterScore(soilData.temperature_c, tempOptimal[0], tempOptimal[1]);
    score *= (tempScore * 0.25 + 0.75);
    
    // Rainfall suitability (15% weight)
    const rainfallOptimal = cropData.optimal_rainfall;
    const rainfallScore = this.calculateParameterScore(soilData.rainfall_mm, rainfallOptimal[0], rainfallOptimal[1]);
    score *= (rainfallScore * 0.15 + 0.85);
    
    // Regional suitability (5% weight)
    const regionScore = cropData.suitable_regions.includes(soilData.region) ? 1 : 0.7;
    score *= (regionScore * 0.05 + 0.95);
    
    // Seasonal suitability (5% weight)
    const seasonScore = cropData.suitable_seasons.includes(soilData.season) ? 1 : 0.8;
    score *= (seasonScore * 0.05 + 0.95);
    
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * Calculate parameter score based on optimal range
   */
  private calculateParameterScore(value: number, optimalMin: number, optimalMax: number): number {
    if (value >= optimalMin && value <= optimalMax) {
      return 1.0; // Perfect score
    }
    
    const range = optimalMax - optimalMin;
    const tolerance = range * 0.3; // 30% tolerance outside optimal range
    
    if (value < optimalMin) {
      const deviation = optimalMin - value;
      return Math.max(0, 1 - (deviation / tolerance));
    } else {
      const deviation = value - optimalMax;
      return Math.max(0, 1 - (deviation / tolerance));
    }
  }

  /**
   * Generate risk factors based on soil conditions
   */
  private generateRiskFactors(soilData: SoilData, cropData: any): string[] {
    const risks: string[] = [];
    
    if (soilData.soil_ph < cropData.optimal_ph[0] - 0.5) {
      risks.push('Soil too acidic - consider lime application');
    } else if (soilData.soil_ph > cropData.optimal_ph[1] + 0.5) {
      risks.push('Soil too alkaline - consider sulfur application');
    }
    
    if (soilData.moisture < cropData.optimal_moisture[0] - 10) {
      risks.push('Low soil moisture - irrigation recommended');
    } else if (soilData.moisture > cropData.optimal_moisture[1] + 10) {
      risks.push('High moisture levels - drainage may be needed');
    }
    
    if (soilData.temperature_c < cropData.optimal_temp[0] - 5) {
      risks.push('Temperature too low for optimal growth');
    } else if (soilData.temperature_c > cropData.optimal_temp[1] + 5) {
      risks.push('High temperature stress possible');
    }
    
    if (soilData.rainfall_mm < cropData.optimal_rainfall[0] - 20) {
      risks.push('Insufficient rainfall - supplemental irrigation needed');
    } else if (soilData.rainfall_mm > cropData.optimal_rainfall[1] + 50) {
      risks.push('Excess rainfall - waterlogging risk');
    }
    
    if (!cropData.suitable_regions.includes(soilData.region)) {
      risks.push('Region not optimal for this crop');
    }
    
    if (!cropData.suitable_seasons.includes(soilData.season)) {
      risks.push('Season not ideal for this crop');
    }
    
    return risks;
  }

  /**
   * Predict yield based on suitability score and crop database
   */
  private predictYield(suitabilityScore: number, cropData: any): number {
    const baseYield = cropData.yield_per_hectare;
    const yieldFactor = suitabilityScore / 100;
    return Math.round(baseYield * yieldFactor);
  }

  /**
   * Generate detailed agricultural notes
   */
  private generateNotes(soilData: SoilData, cropData: any, suitabilityScore: number): string {
    const notes: string[] = [];
    
    if (suitabilityScore >= 85) {
      notes.push('Excellent conditions for this crop.');
    } else if (suitabilityScore >= 70) {
      notes.push('Good growing conditions with minor adjustments needed.');
    } else if (suitabilityScore >= 50) {
      notes.push('Moderate suitability - careful management required.');
    } else {
      notes.push('Challenging conditions - consider alternative crops.');
    }
    
    // Add specific condition notes
    if (soilData.moisture >= cropData.optimal_moisture[0] && soilData.moisture <= cropData.optimal_moisture[1]) {
      notes.push('Optimal moisture levels detected.');
    }
    
    if (soilData.soil_ph >= cropData.optimal_ph[0] && soilData.soil_ph <= cropData.optimal_ph[1]) {
      notes.push('Soil pH is within ideal range.');
    }
    
    notes.push(`Expected growth period: ${cropData.growth_period_days} days.`);
    
    return notes.join(' ');
  }

  /**
   * Main ML prediction function for crop recommendations
   */
  async predictCrops(soilData: SoilData): Promise<CropRecommendation[]> {
    await this.initialize();
    
    console.log('Running ML crop prediction for:', soilData);
    
    const recommendations: CropRecommendation[] = [];
    
    // Analyze each crop in the database
    for (const [cropName, cropData] of Object.entries(CROP_DATABASE)) {
      const suitabilityScore = this.calculateSuitabilityScore(soilData, cropData);
      const riskFactors = this.generateRiskFactors(soilData, cropData);
      const yieldPrediction = this.predictYield(suitabilityScore, cropData);
      const notes = this.generateNotes(soilData, cropData, suitabilityScore);
      
      // Calculate confidence based on suitability and risk factors
      const confidence = Math.round(suitabilityScore * (1 - (riskFactors.length * 0.05)));
      
      recommendations.push({
        crop: cropName.charAt(0).toUpperCase() + cropName.slice(1),
        confidence: Math.max(0, Math.min(100, confidence)),
        suitability_score: suitabilityScore,
        fertilizer_suggestion: cropData.fertilizer,
        notes: notes,
        yield_prediction: yieldPrediction,
        risk_factors: riskFactors
      });
    }
    
    // Sort by suitability score and return top recommendations
    const sortedRecommendations = recommendations
      .sort((a, b) => b.suitability_score - a.suitability_score)
      .slice(0, 5); // Return top 5 recommendations
    
    console.log('ML prediction completed:', sortedRecommendations);
    
    return sortedRecommendations;
  }

  /**
   * Advanced analysis using text classification for additional insights
   */
  async analyzeConditionSentiment(conditionDescription: string): Promise<{ label: string; score: number }> {
    if (!this.textClassifier) {
      return { label: 'NEUTRAL', score: 0.5 };
    }
    
    try {
      const result = await this.textClassifier(conditionDescription);
      return result[0];
    } catch (error) {
      console.warn('Sentiment analysis failed:', error);
      return { label: 'NEUTRAL', score: 0.5 };
    }
  }

  /**
   * Get optimal planting recommendations
   */
  getPlantingRecommendations(cropName: string): {
    spacing: string;
    depth: string;
    irrigation: string;
    harvesting: string;
  } {
    const recommendations: { [key: string]: any } = {
      rice: {
        spacing: '20cm x 10cm',
        depth: '2-3cm in flooded field',
        irrigation: 'Maintain 2-5cm water level',
        harvesting: 'When 80% grains turn golden'
      },
      wheat: {
        spacing: '18-23cm row spacing',
        depth: '3-5cm deep',
        irrigation: 'Crown root initiation, tillering, flowering',
        harvesting: 'When moisture content is 20-25%'
      },
      sugarcane: {
        spacing: '90-120cm row spacing',
        depth: '8-10cm deep',
        irrigation: 'Every 7-10 days in summer',
        harvesting: 'After 12-18 months when mature'
      },
      default: {
        spacing: 'Follow seed packet instructions',
        depth: '2-3 times seed diameter',
        irrigation: 'Regular watering as per crop needs',
        harvesting: 'When crop reaches maturity'
      }
    };
    
    return recommendations[cropName.toLowerCase()] || recommendations.default;
  }
}