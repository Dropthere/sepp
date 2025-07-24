import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { UserData, ComparisonResult } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface ProgressChartProps {
  userData: UserData;
  bestMatch: ComparisonResult;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ userData, bestMatch }) => {
  const measurementLabels = ['Chest', 'Waist', 'Hips', 'Bicep', 'Thigh', 'Calf'];
  
  const barData = {
    labels: measurementLabels,
    datasets: [
      {
        label: 'Your Measurements',
        data: [
          userData.measurements.chest,
          userData.measurements.waist,
          userData.measurements.hips,
          userData.measurements.bicep,
          userData.measurements.thigh,
          userData.measurements.calf,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: bestMatch.competitor.name || 'Target',
        data: [
          bestMatch.competitor.measurements.chest,
          bestMatch.competitor.measurements.waist,
          bestMatch.competitor.measurements.hips,
          bestMatch.competitor.measurements.bicep,
          bestMatch.competitor.measurements.thigh,
          bestMatch.competitor.measurements.calf,
        ],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: measurementLabels,
    datasets: [
      {
        label: 'Similarity %',
        data: [
          bestMatch.measurementSimilarities.chest,
          bestMatch.measurementSimilarities.waist,
          bestMatch.measurementSimilarities.hips,
          bestMatch.measurementSimilarities.bicep,
          bestMatch.measurementSimilarities.thigh,
          bestMatch.measurementSimilarities.calf,
        ],
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'white',
        },
        ticks: {
          color: 'white',
          backdropColor: 'transparent',
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Progress Visualization</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Measurement Comparison</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Similarity Radar</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};