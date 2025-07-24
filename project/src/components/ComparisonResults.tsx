import React from 'react';
import { ComparisonResult } from '../types';
import { Trophy, Target, TrendingUp, Camera, User, Weight } from 'lucide-react';

interface ComparisonResultsProps {
  results: ComparisonResult[];
  recommendations: string[];
}

export const ComparisonResults: React.FC<ComparisonResultsProps> = ({ results, recommendations }) => {
  const bestMatch = results[0];

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getDivisionColor = (division: string) => {
    switch (division) {
      case 'bodybuilding': return 'bg-red-600';
      case 'classic': return 'bg-blue-600';
      case 'mens': return 'bg-green-600';
      case 'bikini': return 'bg-pink-600';
      case 'figure': return 'bg-purple-600';
      case 'physique': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getDivisionDisplayName = (division: string) => {
    switch (division) {
      case 'bodybuilding': return 'Bodybuilding';
      case 'classic': return 'Classic Physique';
      case 'mens': return "Men's Physique";
      case 'bikini': return 'Bikini';
      case 'figure': return 'Figure';
      case 'physique': return "Women's Physique";
      default: return division.charAt(0).toUpperCase() + division.slice(1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Best Match */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="text-yellow-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Your Best Match</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-6 border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-3">
                {bestMatch.competitor.name}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-2 rounded-full text-white text-sm font-bold ${getDivisionColor(bestMatch.competitor.division)}`}>
                  {getDivisionDisplayName(bestMatch.competitor.division)}
                </span>
                <span className="text-3xl font-bold text-green-400">{bestMatch.similarity}% Match</span>
              </div>
              
              {/* Complete Stats Display */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-2">
                  <User className="text-blue-400" size={16} />
                  <div>
                    <p className="text-gray-300 text-xs">Height</p>
                    <p className="text-white font-bold">{bestMatch.competitor.height}cm</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-2">
                  <Weight className="text-green-400" size={16} />
                  <div>
                    <p className="text-gray-300 text-xs">Weight</p>
                    <p className="text-white font-bold">{bestMatch.competitor.weight}kg</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-300 text-xs">Chest</p>
                  <p className="text-white font-bold text-sm">{bestMatch.competitor.measurements.chest}cm</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-300 text-xs">Waist</p>
                  <p className="text-white font-bold text-sm">{bestMatch.competitor.measurements.waist}cm</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-300 text-xs">Hips</p>
                  <p className="text-white font-bold text-sm">{bestMatch.competitor.measurements.hips}cm</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-300 text-xs">Bicep</p>
                  <p className="text-white font-bold text-sm">{bestMatch.competitor.measurements.bicep}cm</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-300 text-xs">Thigh</p>
                  <p className="text-white font-bold text-sm">{bestMatch.competitor.measurements.thigh}cm</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-300 text-xs">Calf</p>
                  <p className="text-white font-bold text-sm">{bestMatch.competitor.measurements.calf}cm</p>
                </div>
              </div>
            </div>

            {bestMatch.competitor.imageUrls && (
              <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="text-blue-400" size={20} />
                  <h4 className="text-lg font-bold text-white">Reference Photo</h4>
                </div>
                <img
                  src={bestMatch.competitor.imageUrls[0]}
                  alt={bestMatch.competitor.name}
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4">Complete Measurement Comparison</h4>
            <div className="space-y-3">
              {Object.entries(bestMatch.measurementSimilarities).map(([measurement, percentage]) => (
                <div key={measurement} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium capitalize">{measurement}</span>
                    <span className="text-white font-bold text-lg">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressBarColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Matches */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-blue-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Top 10 Professional Matches</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {results.slice(0, 10).map((result, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-lg">#{index + 1}</span>
                <span className="text-green-400 font-bold text-xl">{result.similarity}%</span>
              </div>
              
              {result.competitor.imageUrls && (
                <img
                  src={result.competitor.imageUrls[0]}
                  alt={result.competitor.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              )}
              
              <h4 className="text-white font-bold text-sm mb-2 truncate">
                {result.competitor.name}
              </h4>
              <div className="space-y-2">
                <span className={`inline-block px-2 py-1 rounded text-white text-xs font-medium ${getDivisionColor(result.competitor.division)}`}>
                  {getDivisionDisplayName(result.competitor.division)}
                </span>
                <div className="text-xs text-gray-300 space-y-1">
                  <p>Height: {result.competitor.height}cm</p>
                  <p>Weight: {result.competitor.weight}kg</p>
                  <p>Chest: {result.competitor.measurements.chest}cm</p>
                  <p>Bicep: {result.competitor.measurements.bicep}cm</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-green-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Growth Recommendations</h2>
        </div>

        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-5 border-l-4 border-green-400 hover:border-green-300 transition-all duration-300">
              <p className="text-white text-lg leading-relaxed">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};