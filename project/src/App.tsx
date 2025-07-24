import { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { UserForm } from './components/UserForm';
import { ComparisonResults } from './components/ComparisonResults';
import { ProgressChart } from './components/ProgressChart';
import { TrainingPrograms } from './components/TrainingPrograms';
import { NutritionPlanner } from './components/NutritionPlanner';
import { CoachAccess } from './components/CoachAccess';
import { UserData, ComparisonResult } from './types';
import { maleCompetitors, femaleCompetitors } from './data/competitors';
import { findBestMatches, getRecommendations } from './utils/comparison';
import { Dumbbell, BarChart3, Trophy, Zap, Utensils, LogOut, User } from 'lucide-react';
import { getAuthStatus } from './utils/authManager';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<'comparison' | 'training' | 'nutrition' | 'coach'>('comparison');

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await getAuthStatus();
        if (authStatus.isLoggedIn && authStatus.email) {
          setIsLoggedIn(true);
          setUserEmail(authStatus.email);
          setHasActiveSubscription(authStatus.hasActiveSubscription || false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (email: string, hasSubscription: boolean = true) => {
    console.log('✅ Login successful for:', email, 'Has subscription:', hasSubscription);
    setIsLoggedIn(true);
    setUserEmail(email);
    setHasActiveSubscription(hasSubscription);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setHasActiveSubscription(false);
    setUserData(null);
    setComparisonResults([]);
    setRecommendations([]);
    setActiveSection('comparison');
  };

  const handleUserDataSubmit = (data: UserData) => {
    setUserData(data);
    
    // Select appropriate competitor database based on gender
    const competitors = data.gender === 'male' ? maleCompetitors : femaleCompetitors;
    
    // Find best matches across ALL divisions
    const results = findBestMatches(data, competitors, 15);
    setComparisonResults(results);
    
    // Generate recommendations
    if (results.length > 0) {
      const recs = getRecommendations(data, results[0]);
      setRecommendations(recs);
    }
  };

  const resetAnalysis = () => {
    setUserData(null);
    setComparisonResults([]);
    setRecommendations([]);
    setActiveSection('comparison');
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not logged in or no subscription
  if (!isLoggedIn || !hasActiveSubscription) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-2xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Dumbbell className="text-white" size={36} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Pro Physique Comparison</h1>
                <p className="text-gray-300 text-lg">Compare your measurements with elite bodybuilders across all divisions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                <User className="text-green-400" size={20} />
                <span className="text-white font-medium">{userEmail}</span>
              </div>
              {userData && (
                <button
                  onClick={resetAnalysis}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:transform hover:scale-105 font-medium"
                >
                  New Analysis
                </button>
              )}
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!userData ? (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                  <Trophy className="text-white" size={48} />
                </div>
              </div>
              <h2 className="text-5xl font-bold text-white mb-6">
                Compare Your Physique to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Elite</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Enter your measurements and get matched with top professional bodybuilders across ALL divisions. 
                Discover your closest matches and get personalized recommendations for growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="text-blue-400 text-2xl font-bold mb-2">60+</div>
                  <div className="text-white font-medium">Elite Competitors</div>
                  <div className="text-gray-400 text-sm">All divisions included</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="text-green-400 text-2xl font-bold mb-2">8</div>
                  <div className="text-white font-medium">Complete Metrics</div>
                  <div className="text-gray-400 text-sm">Height, weight & measurements</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="text-purple-400 text-2xl font-bold mb-2">AI</div>
                  <div className="text-white font-medium">Body Fat Analysis</div>
                  <div className="text-gray-400 text-sm">From uploaded photos</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="text-yellow-400 text-2xl font-bold mb-2">6</div>
                  <div className="text-white font-medium">Divisions</div>
                  <div className="text-gray-400 text-sm">All major categories</div>
                </div>
              </div>
            </div>
            <UserForm onSubmit={handleUserDataSubmit} />
          </div>
        ) : (
          <div className="space-y-12">
            {/* User Stats Summary */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-green-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Your Current Stats</h2>
                {userData.photo && (
                  <div className="flex items-center gap-2 ml-auto">
                    <Zap className="text-yellow-400" size={20} />
                    <span className="text-yellow-400 font-bold">AI Body Fat: {userData.bodyFat}%</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Height</p>
                  <p className="text-white font-bold text-lg">{userData.height}cm</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Weight</p>
                  <p className="text-white font-bold text-lg">{userData.weight}kg</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Body Fat</p>
                  <p className="text-white font-bold text-lg">{userData.bodyFat}%</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Chest</p>
                  <p className="text-white font-bold text-lg">{userData.measurements.chest}cm</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Waist</p>
                  <p className="text-white font-bold text-lg">{userData.measurements.waist}cm</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Hips</p>
                  <p className="text-white font-bold text-lg">{userData.measurements.hips}cm</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Bicep</p>
                  <p className="text-white font-bold text-lg">{userData.measurements.bicep}cm</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Thigh</p>
                  <p className="text-white font-bold text-lg">{userData.measurements.thigh}cm</p>
                </div>
                <div className="text-center bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 text-sm font-medium">Calf</p>
                  <p className="text-white font-bold text-lg">{userData.measurements.calf}cm</p>
                </div>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setActiveSection('comparison')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    activeSection === 'comparison'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Trophy size={20} />
                  Physique Comparison
                </button>
                <button
                  onClick={() => setActiveSection('training')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    activeSection === 'training'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Dumbbell size={20} />
                  Training Programs
                </button>
                <button
                  onClick={() => setActiveSection('nutrition')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    activeSection === 'nutrition'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Utensils size={20} />
                  Nutrition Planner
                </button>
                <button
                  onClick={() => setActiveSection('coach')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    activeSection === 'coach'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span className="text-xl">💬</span>
                  Coach Access
                </button>
              </div>
            </div>

            {/* Active Section Content */}
            {activeSection === 'comparison' && comparisonResults.length > 0 && (
              <>
                <ComparisonResults results={comparisonResults} recommendations={recommendations} />
                <ProgressChart userData={userData} bestMatch={comparisonResults[0]} />
              </>
            )}

            {activeSection === 'training' && comparisonResults.length > 0 && (
              <TrainingPrograms userData={userData} bestMatch={comparisonResults[0]} />
            )}

            {activeSection === 'nutrition' && (
              <NutritionPlanner userData={userData} />
            )}

            {activeSection === 'coach' && (
              <CoachAccess />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-20 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-400">
            <p className="text-lg">&copy; 2025 Pro Physique Comparison Tool. Compare with the elite, grow like a champion.</p>
            <p className="text-sm mt-2">Professional bodybuilder measurements across all divisions for reference and motivation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;