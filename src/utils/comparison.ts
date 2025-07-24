import { UserData, Competitor, ComparisonResult, Measurements } from '../types';

export function calculateSimilarity(userData: UserData, competitor: Competitor): ComparisonResult {
  const userMeasurements = userData.measurements;
  const competitorMeasurements = competitor.measurements;
  
  // Include height and weight in similarity calculation
  const heightDiff = Math.abs(userData.height - competitor.height);
  const weightDiff = Math.abs(userData.weight - competitor.weight);
  
  // Calculate similarity for measurements
  const measurementKeys = Object.keys(userMeasurements) as (keyof Measurements)[];
  let totalDistance = 0;
  const measurementSimilarities: { [key: string]: number } = {};
  
  measurementKeys.forEach(key => {
    const userValue = userMeasurements[key];
    const competitorValue = competitorMeasurements[key];
    const difference = Math.abs(userValue - competitorValue);
    const maxValue = Math.max(userValue, competitorValue);
    const similarity = Math.max(0, 100 - (difference / maxValue) * 100);
    measurementSimilarities[key] = Math.round(similarity);
    totalDistance += Math.pow(difference, 2);
  });
  
  // Add height and weight to similarity calculation
  const heightSimilarity = Math.max(0, 100 - (heightDiff / Math.max(userData.height, competitor.height)) * 100);
  const weightSimilarity = Math.max(0, 100 - (weightDiff / Math.max(userData.weight, competitor.weight)) * 100);
  
  measurementSimilarities.height = Math.round(heightSimilarity);
  measurementSimilarities.weight = Math.round(weightSimilarity);
  
  // Calculate overall similarity including height and weight
  const totalMeasurements = measurementKeys.length + 2; // +2 for height and weight
  const overallSimilarity = (
    Object.values(measurementSimilarities).reduce((sum, sim) => sum + sim, 0) / totalMeasurements
  );
  
  return {
    competitor,
    similarity: Math.round(overallSimilarity),
    measurementSimilarities
  };
}

export function findBestMatches(userData: UserData, competitors: Competitor[], limit: number = 10): ComparisonResult[] {
  const results = competitors.map(competitor => calculateSimilarity(userData, competitor));
  return results.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
}

export function getRecommendations(userData: UserData, bestMatch: ComparisonResult): string[] {
  const recommendations: string[] = [];
  const userMeasurements = userData.measurements;
  const competitorMeasurements = bestMatch.competitor.measurements;
  
  // Specific target recommendations with exact measurements
  Object.entries(userMeasurements).forEach(([key, value]) => {
    const competitorValue = competitorMeasurements[key as keyof Measurements];
    const difference = competitorValue - value;
    
    if (difference > 1) {
      recommendations.push(
        `Target ${key}: Increase from ${value}cm to ${competitorValue}cm (+${Math.round(difference)}cm) to match ${bestMatch.competitor.name}`
      );
    }
  });
  
  // Height and weight recommendations
  const heightDiff = bestMatch.competitor.height - userData.height;
  const weightDiff = bestMatch.competitor.weight - userData.weight;
  
  if (Math.abs(heightDiff) > 2) {
    recommendations.push(
      `Height difference: ${bestMatch.competitor.name} is ${Math.abs(heightDiff)}cm ${heightDiff > 0 ? 'taller' : 'shorter'} (${bestMatch.competitor.height}cm vs your ${userData.height}cm)`
    );
  }
  
  if (weightDiff > 2) {
    recommendations.push(
      `Target weight: Increase from ${userData.weight}kg to ${bestMatch.competitor.weight}kg (+${Math.round(weightDiff)}kg) to match ${bestMatch.competitor.name}'s competition weight`
    );
  }
  
  // Add general growth recommendations if no specific ones
  if (recommendations.length === 0) {
    recommendations.push(`You're very close to ${bestMatch.competitor.name}'s measurements! Focus on consistent training to maintain and slightly improve all muscle groups.`);
    recommendations.push("Consider progressive overload in your training to continue building muscle mass.");
  }
  
  return recommendations.slice(0, 6);
}
