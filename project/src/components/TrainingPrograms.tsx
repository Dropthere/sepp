import React, { useState } from 'react';
import { UserData, ComparisonResult, TrainingProgram } from '../types';
import { analyzeWeakPoints, calculateProgramSuitability, getCustomizedProgram } from '../utils/trainingRecommendations';
import { Target, Play, Clock, TrendingUp, AlertCircle, CheckCircle, Star, Zap } from 'lucide-react';

interface TrainingProgramsProps {
  userData: UserData;
  bestMatch: ComparisonResult;
}

export const TrainingPrograms: React.FC<TrainingProgramsProps> = ({ userData, bestMatch }) => {
  const [selectedProgramIndex, setSelectedProgramIndex] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  
  const weakPoints = analyzeWeakPoints(userData, bestMatch);
  const programRecommendations = calculateProgramSuitability(userData, weakPoints);
  const selectedProgram = programRecommendations[selectedProgramIndex];
  const customizedProgram = getCustomizedProgram(selectedProgram.program, weakPoints);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    if (percentage >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Weak Point Analysis */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-red-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Weak Point Analysis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {weakPoints.map((weakPoint, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-bold capitalize">{weakPoint.muscle}</h4>
                <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getPriorityColor(weakPoint.priority)}`}>
                  {weakPoint.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                Deficit: <span className="text-red-400 font-bold">+{weakPoint.deficit.toFixed(1)}cm needed</span>
              </p>
              <p className="text-gray-400 text-xs">{weakPoint.recommendation}</p>
            </div>
          ))}
        </div>

        {weakPoints.length === 0 && (
          <div className="bg-green-900 border border-green-600 rounded-lg p-6 text-center">
            <CheckCircle className="text-green-400 mx-auto mb-3" size={48} />
            <h3 className="text-green-400 font-bold text-xl mb-2">Excellent Proportions!</h3>
            <p className="text-white">Your measurements are very close to your best match. Focus on overall progressive overload.</p>
          </div>
        )}
      </div>

      {/* Program Selection */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Dumbbell className="text-blue-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Choose Your Training Program</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {programRecommendations.map((recommendation, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedProgramIndex(index);
                setSelectedDay(0);
              }}
              className={`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 hover:transform hover:scale-105 ${
                selectedProgramIndex === index
                  ? 'border-blue-500 bg-gradient-to-br from-blue-900 to-blue-800'
                  : 'border-gray-600 bg-gradient-to-br from-gray-700 to-gray-600 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{recommendation.program.name}</h3>
                <div className="flex items-center gap-2">
                  <Star className={`${getPercentageColor(recommendation.suitabilityPercentage)}`} size={20} />
                  <span className={`text-2xl font-bold ${getPercentageColor(recommendation.suitabilityPercentage)}`}>
                    {recommendation.suitabilityPercentage}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getLevelColor(recommendation.program.level)}`}>
                  {recommendation.program.level.toUpperCase()}
                </span>
                <span className="bg-gray-600 px-3 py-1 rounded-full text-white text-sm font-bold">
                  {recommendation.program.daysPerWeek} Days/Week
                </span>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{recommendation.program.description}</p>
              <p className="text-blue-300 text-xs font-medium">{recommendation.reason}</p>
            </div>
          ))}
        </div>

        {/* Selected Program Details */}
        {selectedProgram && (
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-6 border border-blue-600 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{customizedProgram.name}</h3>
              <div className="flex items-center gap-3">
                <Zap className="text-yellow-400" size={24} />
                <span className={`text-3xl font-bold ${getPercentageColor(selectedProgram.suitabilityPercentage)}`}>
                  {selectedProgram.suitabilityPercentage}% Match
                </span>
              </div>
            </div>
            <p className="text-blue-100 text-lg mb-4">{customizedProgram.description}</p>
            
            {customizedProgram.customNote && (
              <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="text-yellow-400" size={20} />
                  <span className="text-yellow-400 font-bold">Personalized Recommendation</span>
                </div>
                <p className="text-white">{customizedProgram.customNote}</p>
              </div>
            )}
          </div>
        )}

        {/* Program Days Navigation */}
        {customizedProgram && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {customizedProgram.days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedDay === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day.name}
                </button>
              ))}
            </div>

            {/* Selected Day Details */}
            {customizedProgram.days[selectedDay] && (
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-green-400" size={24} />
                  <h4 className="text-2xl font-bold text-white">{customizedProgram.days[selectedDay].name}</h4>
                </div>
                <p className="text-gray-300 text-lg mb-6">{customizedProgram.days[selectedDay].focus}</p>

                <div className="space-y-4">
                  {customizedProgram.days[selectedDay].exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="bg-gray-800 rounded-lg p-5 border border-gray-600 hover:border-blue-500 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="text-xl font-bold text-white mb-2">{exercise.name}</h5>
                          <div className="flex items-center gap-4 mb-2">
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm font-bold">
                              {exercise.sets} Sets
                            </span>
                            <span className="bg-green-600 px-3 py-1 rounded-full text-white text-sm font-bold">
                              {exercise.reps} Reps
                            </span>
                            {exercise.technique && (
                              <span className="bg-purple-600 px-3 py-1 rounded-full text-white text-sm font-bold">
                                {exercise.technique}
                              </span>
                            )}
                          </div>
                          {exercise.description && (
                            <p className="text-gray-300 text-sm">{exercise.description}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <a
                            href={exercise.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:transform hover:scale-105 text-sm"
                          >
                            <Play size={14} />
                            Exercise
                          </a>
                          {exercise.formVideoUrl && (
                            <a
                              href={exercise.formVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:transform hover:scale-105 text-sm"
                            >
                              <Play size={14} />
                              Form
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rest Day Information */}
            <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-yellow-400" size={24} />
                <h4 className="text-xl font-bold text-white">Rest & Recovery</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="text-white font-bold mb-2">Sleep</h5>
                  <p className="text-gray-300 text-sm">7-9 hours per night for optimal muscle recovery</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="text-white font-bold mb-2">Nutrition</h5>
                  <p className="text-gray-300 text-sm">Adequate protein (1g per lb bodyweight) and calories</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="text-white font-bold mb-2">Active Recovery</h5>
                  <p className="text-gray-300 text-sm">Light walking, stretching, or yoga on rest days</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Discord Coaching Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-8 shadow-2xl border border-purple-600">
        <CoachingPopup />
      </div>
    </div>
  );
};

const CoachingPopup: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-600 p-3 rounded-xl">
            <span className="text-white text-2xl">💬</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Get Real Coach Feedback</h2>
            <p className="text-purple-200 text-lg">Direct access to professional guidance</p>
          </div>
        </div>

        <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-purple-500">
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg leading-relaxed">
                <strong>This isn't a bot answering you</strong> — this is real, coach-verified feedback based on your body, goals, and progress.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg leading-relaxed">
                <strong>You stay anonymous</strong> — I personally answer your questions each morning and guide you through the tools.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg leading-relaxed">
                <strong>If you want personal coaching</strong>, that's available as a separate service.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:transform hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <div className="text-lg">Ask Your Coach</div>
                <div className="text-sm opacity-90">Get personalized answers</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};