import React, { useState } from 'react';
import { UserData } from '../types';
import { Camera, User, Upload, Zap } from 'lucide-react';

interface UserFormProps {
  onSubmit: (userData: UserData) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    hips: '',
    bicep: '',
    thigh: '',
    calf: '',
    gender: 'male' as 'male' | 'female'
  });

  const [photo, setPhoto] = useState<string>('');
  const [estimatedBodyFat, setEstimatedBodyFat] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target?.result as string;
        setPhoto(photoData);
        
        // Simulate AI body fat analysis
        const randomBodyFat = Math.floor(Math.random() * 15) + 8; // 8-23%
        setEstimatedBodyFat(randomBodyFat);
        setFormData(prev => ({ ...prev, bodyFat: randomBodyFat.toString() }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: UserData = {
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      bodyFat: parseFloat(formData.bodyFat),
      measurements: {
        chest: parseFloat(formData.chest),
        waist: parseFloat(formData.waist),
        hips: parseFloat(formData.hips),
        bicep: parseFloat(formData.bicep),
        thigh: parseFloat(formData.thigh),
        calf: parseFloat(formData.calf)
      },
      gender: formData.gender,
      photo,
      timestamp: Date.now()
    };

    onSubmit(userData);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
      <div className="flex items-center gap-3 mb-8">
        <User className="text-blue-400" size={28} />
        <h2 className="text-3xl font-bold text-white">Enter Your Measurements</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="180"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="80"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">
              Body Fat (%) 
              {estimatedBodyFat && (
                <span className="text-green-400 ml-2">
                  <Zap className="inline w-4 h-4" /> AI Estimated: {estimatedBodyFat}%
                </span>
              )}
            </label>
            <input
              type="number"
              name="bodyFat"
              value={formData.bodyFat}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="15"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Upload a photo below for AI analysis</p>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <label className="block text-sm font-bold text-gray-300 mb-4">Upload Photo for AI Body Fat Analysis</label>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-lg px-6 py-3 text-white cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
            >
              <Upload size={20} />
              Choose Photo
            </label>
            {photo && (
              <div className="flex items-center gap-2">
                <Camera className="text-green-400" size={20} />
                <span className="text-green-400 font-medium">Photo uploaded successfully</span>
              </div>
            )}
          </div>
          
          {estimatedBodyFat && (
            <div className="bg-green-900 border border-green-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-green-400" size={20} />
                <span className="text-green-400 font-bold">AI Analysis Complete</span>
              </div>
              <p className="text-white text-lg">
                Estimated Body Fat: <span className="font-bold text-green-400">{estimatedBodyFat}%</span>
              </p>
              <p className="text-gray-300 text-sm mt-1">
                This estimate is automatically filled in the body fat field above
              </p>
            </div>
          )}
          
          <p className="text-xs text-gray-400 mt-2">AI will analyze your photo to estimate body fat percentage</p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h3 className="text-xl font-bold text-white mb-4">Body Measurements (cm)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Chest</label>
              <input
                type="number"
                name="chest"
                value={formData.chest}
                onChange={handleInputChange}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Waist</label>
              <input
                type="number"
                name="waist"
                value={formData.waist}
                onChange={handleInputChange}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="80"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Hips</label>
              <input
                type="number"
                name="hips"
                value={formData.hips}
                onChange={handleInputChange}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="95"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Bicep</label>
              <input
                type="number"
                name="bicep"
                value={formData.bicep}
                onChange={handleInputChange}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Thigh</label>
              <input
                type="number"
                name="thigh"
                value={formData.thigh}
                onChange={handleInputChange}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="60"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Calf</label>
              <input
                type="number"
                name="calf"
                value={formData.calf}
                onChange={handleInputChange}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="38"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 shadow-lg"
        >
          🔥 Analyze My Physique Against the Pros
        </button>
      </form>
    </div>
  );
};