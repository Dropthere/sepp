export interface Measurements {
  chest: number;
  waist: number;
  hips: number;
  bicep: number;
  thigh: number;
  calf: number;
}

export interface UserData {
  height: number;
  weight: number;
  bodyFat: number;
  measurements: Measurements;
  gender: 'male' | 'female';
  photo?: string;
  timestamp: number;
}

export interface Competitor {
  division: string;
  name: string;
  height: number;
  weight: number;
  imageUrls?: string[];
  measurements: Measurements;
}

export interface ComparisonResult {
  competitor: Competitor;
  similarity: number;
  measurementSimilarities: {
    [key: string]: number;
  };
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  technique?: string;
  videoUrl: string;
  formVideoUrl?: string;
  description?: string;
}

export interface TrainingDay {
  name: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingProgram {
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  daysPerWeek: number;
  days: TrainingDay[];
  customNote?: string;
  customNote?: string;
}

export interface FoodItem {
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  sugar: number;
  calories: number;
  serving: number;
}

export interface MealPlan {
  meals: Meal[];
  totalNutrients: NutritionTargets;
}

export interface Meal {
  name: string;
  foods: { item: FoodItem; amount: number }[];
  nutrients: NutritionTargets;
}

export interface NutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sugar: number;
}

export interface NutritionGoals {
  goal: 'bulk' | 'maintain' | 'cut';
  mealsPerDay: number;
  dietType: string;
  calorieAdjustment: number;
  foodPreferences: { [mealIndex: number]: { [category: string]: string } };
}

export interface UserPreferences {
  id: string;
  nutritionGoals: NutritionGoals;
  savedMealPlans: MealPlan[];
  lastUpdated: number;
}