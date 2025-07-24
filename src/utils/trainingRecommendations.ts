import { UserData, ComparisonResult, TrainingProgram } from '../types';
import { trainingPrograms } from '../data/trainingPrograms';

export interface WeakPoint {
  muscle: string;
  priority: 'high' | 'medium' | 'low';
  deficit: number;
  recommendation: string;
}

export interface ProgramRecommendation {
  program: TrainingProgram;
  suitabilityPercentage: number;
  reason: string;
}

export function analyzeWeakPoints(userData: UserData, bestMatch: ComparisonResult): WeakPoint[] {
  const weakPoints: WeakPoint[] = [];
  const similarities = bestMatch.measurementSimilarities;
  
  // Analyze each measurement and determine weak points
  Object.entries(similarities).forEach(([measurement, similarity]) => {
    if (measurement === 'height' || measurement === 'weight') return;
    
    const userValue = userData.measurements[measurement as keyof typeof userData.measurements];
    const targetValue = bestMatch.competitor.measurements[measurement as keyof typeof bestMatch.competitor.measurements];
    const deficit = targetValue - userValue;
    
    if (deficit > 0) { // Only suggest increases, never decreases
      let priority: 'high' | 'medium' | 'low' = 'low';
      
      if (similarity < 70) priority = 'high';
      else if (similarity < 85) priority = 'medium';
      
      weakPoints.push({
        muscle: measurement,
        priority,
        deficit,
        recommendation: `Increase ${measurement} by ${deficit.toFixed(1)}cm to match ${bestMatch.competitor.name}'s measurements`
      });
    }
  });
  
  // Sort by priority and deficit
  return weakPoints.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.deficit - a.deficit;
  });
}

export function calculateProgramSuitability(userData: UserData, weakPoints: WeakPoint[]): ProgramRecommendation[] {
  const recommendations: ProgramRecommendation[] = [];
  
  const highPriorityCount = weakPoints.filter(wp => wp.priority === 'high').length;
  const totalWeakPoints = weakPoints.length;
  
  trainingPrograms.forEach(program => {
    let suitabilityPercentage = 50; // Base percentage
    let reason = '';
    
    switch (program.name) {
      case "2-Day Split":
        if (totalWeakPoints > 4 || highPriorityCount > 2) {
          suitabilityPercentage = 95;
          reason = "Perfect for beginners with multiple areas to improve. Allows full recovery between sessions.";
        } else if (totalWeakPoints > 2) {
          suitabilityPercentage = 75;
          reason = "Good foundation program, but you might benefit from more frequency.";
        } else {
          suitabilityPercentage = 60;
          reason = "May be too basic for your current level.";
        }
        break;
        
      case "3-Day Split":
        if (totalWeakPoints >= 2 && totalWeakPoints <= 4) {
          suitabilityPercentage = 90;
          reason = "Ideal balance of volume and recovery for your current weak points.";
        } else if (totalWeakPoints > 4) {
          suitabilityPercentage = 75;
          reason = "Good option, but 2-day split might be better for beginners.";
        } else {
          suitabilityPercentage = 80;
          reason = "Solid intermediate program for continued progress.";
        }
        break;
        
      case "Female Glute & Leg Specialization":
        if (userData.gender === 'female') {
          const legWeakPoints = weakPoints.filter(wp => 
            wp.muscle === 'thigh' || wp.muscle === 'hips' || wp.muscle === 'calf'
          );
          if (legWeakPoints.length > 0) {
            suitabilityPercentage = 85;
            reason = "Specialized program targeting your leg weak points.";
          } else {
            suitabilityPercentage = 70;
            reason = "Good for overall leg development.";
          }
        } else {
          suitabilityPercentage = 30;
          reason = "Designed specifically for female physique goals.";
        }
        break;
        
      case "4-Day Back & Tricep Strongman":
        const backWeakPoints = weakPoints.filter(wp => 
          wp.muscle === 'chest' || wp.muscle === 'bicep'
        );
        if (backWeakPoints.length > 0) {
          suitabilityPercentage = 80;
          reason = "Targets back and tricep development with good intensity.";
        } else {
          suitabilityPercentage = 70;
          reason = "Good for intermediate trainees wanting more volume.";
        }
        break;
        
      case "6-Day Bodybuilder Split":
        if (totalWeakPoints <= 2 && highPriorityCount === 0) {
          suitabilityPercentage = 95;
          reason = "Perfect for advanced trainees with good proportions. Maximum specialization.";
        } else if (totalWeakPoints <= 3) {
          suitabilityPercentage = 80;
          reason = "High volume program for experienced lifters.";
        } else {
          suitabilityPercentage = 60;
          reason = "Very demanding - ensure you can recover from this volume.";
        }
        break;
    }
    
    recommendations.push({
      program,
      suitabilityPercentage,
      reason
    });
  });
  
  // Sort by suitability percentage
  return recommendations.sort((a, b) => b.suitabilityPercentage - a.suitabilityPercentage);
}

export function getCustomizedProgram(program: TrainingProgram, weakPoints: WeakPoint[]) {
  const customizedProgram = { ...program };
  const highPriorityMuscles = weakPoints
    .filter(wp => wp.priority === 'high')
    .map(wp => wp.muscle);
  
  // Add note about prioritizing weak points
  customizedProgram.customNote = highPriorityMuscles.length > 0 
    ? `🎯 PRIORITY FOCUS: ${highPriorityMuscles.join(', ')}. Add 1-2 extra sets for these muscle groups. Remember: you need to train all six muscle groups to stay a bodybuilder and keep getting larger!`
    : "✅ Your measurements are well-balanced. Focus on progressive overload across all exercises to continue growing all muscle groups!";
  
  return customizedProgram;
}
