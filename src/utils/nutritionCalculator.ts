import { UserData, NutritionTargets, NutritionGoals, MealPlan, Meal, FoodItem } from '../types';
import { foodLibrary } from '../data/foodLibrary';

export function calculateNutritionTargets(userData: UserData, goals: NutritionGoals): NutritionTargets {
  const { height, weight, gender } = userData;
  const age = 25; // Default age if not provided
  
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr: number;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  // Activity multiplier (assuming very active for bodybuilders)
  const activityMultiplier = 1.725;
  const tdee = bmr * activityMultiplier;
  
  // Adjust calories based on goal
  let targetCalories = tdee;
  switch (goals.goal) {
    case 'bulk':
      targetCalories = tdee + 500; // Surplus for muscle gain
      break;
    case 'cut':
      targetCalories = tdee - 500; // Deficit for fat loss
      break;
    case 'maintain':
      targetCalories = tdee; // Maintenance
      break;
  }
  
  // Apply additional calorie adjustment
  targetCalories += goals.calorieAdjustment;
  
  // Calculate macros based on diet type
  let protein: number, carbs: number, fats: number;
  
  switch (goals.dietType) {
    case 'bodybuilding':
      protein = Math.min(weight * 2.2, targetCalories * 0.4 / 4);
      fats = Math.max(weight * 0.5, targetCalories * 0.2 / 9);
      carbs = (targetCalories - (protein * 4 + fats * 9)) / 4;
      break;
    case 'lowcarb':
      protein = targetCalories * 0.3 / 4;
      fats = targetCalories * 0.5 / 9;
      carbs = targetCalories * 0.2 / 4;
      break;
    case 'keto':
      protein = targetCalories * 0.25 / 4;
      fats = targetCalories * 0.7 / 9;
      carbs = targetCalories * 0.05 / 4;
      break;
    case 'highprotein':
      protein = weight * 2.5;
      fats = targetCalories * 0.25 / 9;
      carbs = (targetCalories - (protein * 4 + fats * 9)) / 4;
      break;
    default:
      protein = Math.min(weight * 1.6, targetCalories * 0.3 / 4);
      carbs = targetCalories * 0.5 / 4;
      fats = targetCalories * 0.2 / 9;
  }
  
  const sugar = Math.max(carbs * 0.1, 0);
  
  return {
    calories: Math.round(targetCalories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
    sugar: Math.round(sugar)
  };
}

export function generateMealPlan(targets: NutritionTargets, goals: NutritionGoals): MealPlan {
  const meals: Meal[] = [];
  const mealsPerDay = goals.mealsPerDay;
  
  // Distribute macros across meals
  const proteinPerMeal = distributeMacros(targets.protein, mealsPerDay);
  const carbsPerMeal = distributeMacros(targets.carbs, mealsPerDay);
  const fatsPerMeal = distributeMacros(targets.fats, mealsPerDay);
  const caloriesPerMeal = distributeMacros(targets.calories, mealsPerDay);
  
  for (let i = 0; i < mealsPerDay; i++) {
    const mealTargets: NutritionTargets = {
      protein: proteinPerMeal[i],
      carbs: carbsPerMeal[i],
      fats: fatsPerMeal[i],
      sugar: targets.sugar / mealsPerDay,
      calories: caloriesPerMeal[i]
    };
    
    const meal = generateSingleMeal(`Meal ${i + 1}`, mealTargets, goals.foodPreferences[i] || {});
    meals.push(meal);
  }
  
  // Calculate total nutrients
  const totalNutrients = meals.reduce((total, meal) => ({
    calories: total.calories + meal.nutrients.calories,
    protein: total.protein + meal.nutrients.protein,
    carbs: total.carbs + meal.nutrients.carbs,
    fats: total.fats + meal.nutrients.fats,
    sugar: total.sugar + meal.nutrients.sugar
  }), { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 });
  
  return {
    meals,
    totalNutrients
  };
}

function distributeMacros(totalMacro: number, mealCount: number): number[] {
  const baseMacro = Math.floor(totalMacro / mealCount);
  const remainder = totalMacro % mealCount;
  return Array(mealCount).fill(baseMacro).map((macro, index) => 
    index < remainder ? macro + 1 : macro
  );
}

function generateSingleMeal(name: string, targets: NutritionTargets, foodSelections: { [category: string]: string }): Meal {
  const foods: { item: FoodItem; amount: number }[] = [];
  let currentNutrients = { protein: 0, carbs: 0, fats: 0, sugar: 0, calories: 0 };
  
  // Define food categories with their target calculations
  const foodCategories = [
    {
      key: 'proteins',
      defaultFood: 'Chicken Breast',
      calculateAmount: (item: FoodItem) => Math.max(Math.round((targets.protein / item.protein) * item.serving), 50)
    },
    {
      key: 'carbohydrates',
      defaultFood: 'Brown Rice',
      calculateAmount: (item: FoodItem) => Math.max(Math.round((targets.carbs / item.carbs) * item.serving), 30)
    },
    {
      key: 'fats',
      defaultFood: 'Olive Oil',
      calculateAmount: (item: FoodItem) => Math.max(Math.round((targets.fats / item.fats) * item.serving), 10)
    },
    {
      key: 'vegetables',
      defaultFood: 'Broccoli',
      calculateAmount: () => 150 // Standard serving
    },
    {
      key: 'dairy',
      defaultFood: 'Greek Yogurt',
      calculateAmount: (item: FoodItem) => Math.max(Math.round((targets.protein * 0.3 / item.protein) * item.serving), 50)
    },
    {
      key: 'fruits',
      defaultFood: 'Apple',
      calculateAmount: (item: FoodItem) => Math.max(Math.round((targets.sugar / item.sugar) * item.serving), 100)
    },
    {
      key: 'sugarFree',
      defaultFood: 'Sugar free jelly',
      calculateAmount: () => 20 // Small serving
    },
    {
      key: 'sauces',
      defaultFood: 'Soy sauce',
      calculateAmount: () => 15 // Small serving
    },
    {
      key: 'seasonings',
      defaultFood: 'Salt',
      calculateAmount: () => 5 // Very small serving
    }
  ];

  // Add foods based on selections
  foodCategories.forEach(category => {
    const selectedFood = foodSelections[category.key];
    
    // Only add if food is selected and not empty/none
    if (selectedFood && selectedFood !== '' && selectedFood !== 'none') {
      const item = getRandomFoodItem(category.key as keyof typeof foodLibrary, selectedFood);
      if (item) {
        const amount = category.calculateAmount(item);
        foods.push({ item, amount });
        updateNutrients(currentNutrients, item, amount);
      }
    }
  });

  // If no foods selected, add defaults
  if (foods.length === 0) {
    foodCategories.slice(0, 4).forEach(category => { // Only add main 4 categories as defaults
      const item = getRandomFoodItem(category.key as keyof typeof foodLibrary, category.defaultFood);
      if (item) {
        const amount = category.calculateAmount(item);
        foods.push({ item, amount });
        updateNutrients(currentNutrients, item, amount);
      }
    });
  }
  
  return {
    name,
    foods,
    nutrients: currentNutrients
  };
}

function getRandomFoodItem(category: keyof typeof foodLibrary, preferredItem: string): FoodItem | null {
  const categoryItems = foodLibrary[category];
  if (!categoryItems || categoryItems.length === 0) return null;
  
  const preferred = categoryItems.find(item => item.name === preferredItem);
  if (preferred) return preferred;
  
  return categoryItems[Math.floor(Math.random() * categoryItems.length)];
}

function updateNutrients(current: any, item: FoodItem, amount: number) {
  const multiplier = amount / item.serving;
  current.protein += item.protein * multiplier;
  current.carbs += item.carbs * multiplier;
  current.fats += item.fats * multiplier;
  current.sugar += item.sugar * multiplier;
  current.calories += item.calories * multiplier;
}

export function recalculateMealWithNewFood(
  targets: NutritionTargets, 
  foodSelections: { [category: string]: string }
): Meal {
  return generateSingleMeal('Custom Meal', targets, foodSelections);
}

export function saveUserPreferences(preferences: { nutritionGoals?: any; userProfile?: string; mealPlan?: any }) {
  localStorage.setItem('nutritionPreferences', JSON.stringify(preferences));
}

export function loadUserPreferences() {
  const saved = localStorage.getItem('nutritionPreferences');
  return saved ? JSON.parse(saved) : null;
}