import React, { useState, useEffect } from 'react';
import { UserData, NutritionGoals, MealPlan } from '../types';
import { calculateNutritionTargets, generateMealPlan, recalculateMealWithNewFood, saveUserPreferences, loadUserPreferences } from '../utils/nutritionCalculator';
import { foodLibrary } from '../data/foodLibrary';
import { Utensils, Target, RefreshCw, ChefHat, Zap, TrendingUp, Scale, User, Save } from 'lucide-react';

interface NutritionPlannerProps {
  userData: UserData;
}

export const NutritionPlanner: React.FC<NutritionPlannerProps> = ({ userData }) => {
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>({
    goal: 'bulk',
    mealsPerDay: 5,
    dietType: 'bodybuilding',
    calorieAdjustment: 0,
    foodPreferences: {}
  });

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [selectedMealIndex, setSelectedMealIndex] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<string>('');

  // Load saved preferences on component mount
  useEffect(() => {
    const savedPreferences = loadUserPreferences();
    if (savedPreferences) {
      setNutritionGoals(savedPreferences.nutritionGoals || nutritionGoals);
      setUserProfile(savedPreferences.userProfile || '');
      if (savedPreferences.mealPlan) {
        setMealPlan(savedPreferences.mealPlan);
      }
    }
  }, []);

  const handleGoalChange = (field: keyof NutritionGoals, value: any) => {
    const updatedGoals = { ...nutritionGoals, [field]: value };
    setNutritionGoals(updatedGoals);
    
    // Save preferences
    saveUserPreferences({
      nutritionGoals: updatedGoals,
      userProfile,
      mealPlan
    });
  };

  const handleFoodSelection = (mealIndex: number, category: string, foodName: string) => {
    const updatedPreferences = {
      ...nutritionGoals.foodPreferences,
      [mealIndex]: {
        ...(nutritionGoals.foodPreferences[mealIndex] || {}),
        [category]: foodName
      }
    };
    
    const updatedGoals = {
      ...nutritionGoals,
      foodPreferences: updatedPreferences
    };
    
    setNutritionGoals(updatedGoals);
    
    // Recalculate the specific meal with new food selection
    if (mealPlan) {
      const targets = calculateNutritionTargets(userData, updatedGoals);
      const mealTargets = {
        protein: targets.protein / updatedGoals.mealsPerDay,
        carbs: targets.carbs / updatedGoals.mealsPerDay,
        fats: targets.fats / updatedGoals.mealsPerDay,
        sugar: targets.sugar / updatedGoals.mealsPerDay,
        calories: targets.calories / updatedGoals.mealsPerDay
      };

      const newMeal = recalculateMealWithNewFood(mealTargets, updatedPreferences[mealIndex] || {});
      newMeal.name = `Meal ${mealIndex + 1}`;

      const updatedMeals = [...mealPlan.meals];
      updatedMeals[mealIndex] = newMeal;
      
      const updatedMealPlan = {
        ...mealPlan,
        meals: updatedMeals,
        totalNutrients: updatedMeals.reduce((total, meal) => ({
          calories: total.calories + meal.nutrients.calories,
          protein: total.protein + meal.nutrients.protein,
          carbs: total.carbs + meal.nutrients.carbs,
          fats: total.fats + meal.nutrients.fats,
          sugar: total.sugar + meal.nutrients.sugar
        }), { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 })
      };
      
      setMealPlan(updatedMealPlan);
      
      // Save updated preferences and meal plan
      saveUserPreferences({
        nutritionGoals: updatedGoals,
        userProfile,
        mealPlan: updatedMealPlan
      });
    }
  };

  const generateNewMealPlan = () => {
    const targets = calculateNutritionTargets(userData, nutritionGoals);
    const newMealPlan = generateMealPlan(targets, nutritionGoals);
    setMealPlan(newMealPlan);
    
    // Save the new meal plan
    saveUserPreferences({
      nutritionGoals,
      userProfile,
      mealPlan: newMealPlan
    });
  };

  const regenerateMeal = (mealIndex: number) => {
    if (!mealPlan) return;
    
    const targets = calculateNutritionTargets(userData, nutritionGoals);
    const mealTargets = {
      protein: targets.protein / nutritionGoals.mealsPerDay,
      carbs: targets.carbs / nutritionGoals.mealsPerDay,
      fats: targets.fats / nutritionGoals.mealsPerDay,
      sugar: targets.sugar / nutritionGoals.mealsPerDay,
      calories: targets.calories / nutritionGoals.mealsPerDay
    };

    // Use current food preferences for this meal, or defaults
    const currentPreferences = nutritionGoals.foodPreferences[mealIndex] || {};
    const newMeal = recalculateMealWithNewFood(mealTargets, currentPreferences);
    newMeal.name = `Meal ${mealIndex + 1}`;

    const updatedMeals = [...mealPlan.meals];
    updatedMeals[mealIndex] = newMeal;
    
    const updatedMealPlan = {
      ...mealPlan,
      meals: updatedMeals,
      totalNutrients: updatedMeals.reduce((total, meal) => ({
        calories: total.calories + meal.nutrients.calories,
        protein: total.protein + meal.nutrients.protein,
        carbs: total.carbs + meal.nutrients.carbs,
        fats: total.fats + meal.nutrients.fats,
        sugar: total.sugar + meal.nutrients.sugar
      }), { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 })
    };
    
    setMealPlan(updatedMealPlan);
    
    // Save updated meal plan
    saveUserPreferences({
      nutritionGoals,
      userProfile,
      mealPlan: updatedMealPlan
    });
  };

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'bulk': return 'bg-green-600';
      case 'cut': return 'bg-red-600';
      case 'maintain': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case 'bulk': return <TrendingUp className="text-white" size={20} />;
      case 'cut': return <Scale className="text-white" size={20} />;
      case 'maintain': return <Target className="text-white" size={20} />;
      default: return <Target className="text-white" size={20} />;
    }
  };

  const getFoodCategories = () => {
    return [
      { key: 'proteins', name: 'Protein Source', icon: '🥩' },
      { key: 'carbohydrates', name: 'Carb Source', icon: '🍚' },
      { key: 'fats', name: 'Fat Source', icon: '🥑' },
      { key: 'vegetables', name: 'Vegetables', icon: '🥦' },
      { key: 'dairy', name: 'Dairy', icon: '🥛' },
      { key: 'fruits', name: 'Fruits', icon: '🍎' },
      { key: 'sugarFree', name: 'Sugar Free', icon: '🍫' },
      { key: 'sauces', name: 'Sauces', icon: '🥄' },
      { key: 'seasonings', name: 'Seasonings', icon: '🧂' }
    ];
  };

  return (
    <div className="space-y-8">
      {/* User Profile Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <User className="text-purple-400" size={24} />
          <h3 className="text-xl font-bold text-white">User Profile</h3>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter your name (optional)"
            value={userProfile}
            onChange={(e) => {
              setUserProfile(e.target.value);
              saveUserPreferences({
                nutritionGoals,
                userProfile: e.target.value,
                mealPlan
              });
            }}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={() => saveUserPreferences({ nutritionGoals, userProfile, mealPlan })}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>

      {/* Nutrition Goals Setup */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="text-green-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Nutrition Goals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Primary Goal</label>
            <div className="grid grid-cols-1 gap-2">
              {(['bulk', 'maintain', 'cut'] as const).map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalChange('goal', goal)}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                    nutritionGoals.goal === goal
                      ? `${getGoalColor(goal)} border-white`
                      : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {getGoalIcon(goal)}
                  <span className="text-white font-medium capitalize">{goal}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Meals Per Day</label>
            <select
              value={nutritionGoals.mealsPerDay}
              onChange={(e) => handleGoalChange('mealsPerDay', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} Meals</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Diet Type</label>
            <select
              value={nutritionGoals.dietType}
              onChange={(e) => handleGoalChange('dietType', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="bodybuilding">Bodybuilding</option>
              <option value="highprotein">High Protein</option>
              <option value="lowcarb">Low Carb</option>
              <option value="keto">Ketogenic</option>
              <option value="paleo">Paleo</option>
              <option value="mediterranean">Mediterranean</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Calorie Adjustment</label>
            <select
              value={nutritionGoals.calorieAdjustment}
              onChange={(e) => handleGoalChange('calorieAdjustment', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>Normal</option>
              <option value={300}>+300 calories</option>
              <option value={600}>+600 calories</option>
              <option value={1000}>+1000 calories</option>
              <option value={-300}>-300 calories</option>
              <option value={-600}>-600 calories</option>
              <option value={-1000}>-1000 calories</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateNewMealPlan}
          className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <ChefHat size={24} />
          Generate Personalized Meal Plan
        </button>
      </div>

      {/* Meal Plan Results */}
      {mealPlan && (
        <>
          {/* Nutrition Targets Overview */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-blue-400" size={28} />
              <h2 className="text-3xl font-bold text-white">Daily Nutrition Targets</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-4 text-center border border-blue-600">
                <p className="text-blue-300 text-sm font-medium">Calories</p>
                <p className="text-white font-bold text-2xl">{Math.round(mealPlan.totalNutrients.calories)}</p>
                <p className="text-blue-200 text-xs">kcal</p>
              </div>
              <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-4 text-center border border-red-600">
                <p className="text-red-300 text-sm font-medium">Protein</p>
                <p className="text-white font-bold text-2xl">{Math.round(mealPlan.totalNutrients.protein)}</p>
                <p className="text-red-200 text-xs">grams</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg p-4 text-center border border-yellow-600">
                <p className="text-yellow-300 text-sm font-medium">Carbs</p>
                <p className="text-white font-bold text-2xl">{Math.round(mealPlan.totalNutrients.carbs)}</p>
                <p className="text-yellow-200 text-xs">grams</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-4 text-center border border-purple-600">
                <p className="text-purple-300 text-sm font-medium">Fats</p>
                <p className="text-white font-bold text-2xl">{Math.round(mealPlan.totalNutrients.fats)}</p>
                <p className="text-purple-200 text-xs">grams</p>
              </div>
              <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 text-center border border-green-600">
                <p className="text-green-300 text-sm font-medium">Sugar</p>
                <p className="text-white font-bold text-2xl">{Math.round(mealPlan.totalNutrients.sugar)}</p>
                <p className="text-green-200 text-xs">grams</p>
              </div>
            </div>
          </div>

          {/* Meal Plan */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ChefHat className="text-yellow-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Your Meal Plan</h2>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-400" size={20} />
                <span className="text-yellow-400 font-bold">AI Generated</span>
              </div>
            </div>

            {/* Meal Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {mealPlan.meals.map((meal, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMealIndex(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedMealIndex === index
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {meal.name}
                </button>
              ))}
            </div>

            {/* Selected Meal Details */}
            {mealPlan.meals[selectedMealIndex] && (
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {mealPlan.meals[selectedMealIndex].name}
                  </h3>
                  <button
                    onClick={() => regenerateMeal(selectedMealIndex)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                  >
                    <RefreshCw size={16} />
                    Regenerate
                  </button>
                </div>

                {/* Food Selection Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {getFoodCategories().map((category) => (
                    <div key={category.key} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        {category.icon} {category.name}
                      </label>
                      <select
                        value={nutritionGoals.foodPreferences[selectedMealIndex]?.[category.key] || ''}
                        onChange={(e) => handleFoodSelection(selectedMealIndex, category.key, e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">None (Off)</option>
                        <option value="">Select {category.name}</option>
                        {foodLibrary[category.key as keyof typeof foodLibrary]?.map((food) => (
                          <option key={food.name} value={food.name}>
                            {food.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Food Items Display */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white mb-4">Food Breakdown:</h4>
                  {mealPlan.meals[selectedMealIndex].foods.map((food, foodIndex) => (
                    <div key={foodIndex} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-white">{food.item.name}</h4>
                        <span className="bg-green-600 px-3 py-1 rounded-full text-white text-sm font-bold">
                          {food.amount}g
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                        <div className="text-center">
                          <p className="text-gray-300">Calories</p>
                          <p className="text-white font-bold">
                            {Math.round((food.item.calories * food.amount) / food.item.serving)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300">Protein</p>
                          <p className="text-white font-bold">
                            {Math.round((food.item.protein * food.amount) / food.item.serving)}g
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300">Carbs</p>
                          <p className="text-white font-bold">
                            {Math.round((food.item.carbs * food.amount) / food.item.serving)}g
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300">Fats</p>
                          <p className="text-white font-bold">
                            {Math.round((food.item.fats * food.amount) / food.item.serving)}g
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-300">Sugar</p>
                          <p className="text-white font-bold">
                            {Math.round((food.item.sugar * food.amount) / food.item.serving)}g
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {mealPlan.meals[selectedMealIndex].foods.length === 0 && (
                    <div className="bg-gray-700 rounded-lg p-6 text-center border border-gray-600">
                      <p className="text-gray-300">No foods selected for this meal. Choose foods from the dropdowns above.</p>
                    </div>
                  )}
                </div>

                {/* Meal Totals */}
                <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-lg font-bold text-white mb-3">Meal Totals</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    <div>
                      <p className="text-gray-300 text-sm">Calories</p>
                      <p className="text-white font-bold text-lg">
                        {Math.round(mealPlan.meals[selectedMealIndex].nutrients.calories)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Protein</p>
                      <p className="text-white font-bold text-lg">
                        {Math.round(mealPlan.meals[selectedMealIndex].nutrients.protein)}g
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Carbs</p>
                      <p className="text-white font-bold text-lg">
                        {Math.round(mealPlan.meals[selectedMealIndex].nutrients.carbs)}g
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Fats</p>
                      <p className="text-white font-bold text-lg">
                        {Math.round(mealPlan.meals[selectedMealIndex].nutrients.fats)}g
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Sugar</p>
                      <p className="text-white font-bold text-lg">
                        {Math.round(mealPlan.meals[selectedMealIndex].nutrients.sugar)}g
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};