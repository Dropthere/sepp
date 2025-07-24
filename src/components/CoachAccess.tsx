import React from 'react';
import { MessageCircle, Crown, Shield, Star, Zap, Users, Gift, Calendar } from 'lucide-react';

export const CoachAccess: React.FC = () => {
  const handleFreeAccess = () => {
    window.open('https://website-discord-chat1.vercel.app/', '_blank');
  };

  const handleExclusiveAccess = () => {
    window.open('https://client-text-and-phone-appointment.vercel.app/', '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-8 shadow-2xl border border-purple-600">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-purple-600 p-4 rounded-xl">
            <MessageCircle className="text-white" size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Direct Coach Access</h1>
            <p className="text-purple-200 text-xl">Get real professional guidance, not AI responses</p>
          </div>
        </div>

        <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-purple-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 w-4 h-4 rounded-full mt-1 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Real Coach Feedback</h3>
                <p className="text-gray-300">This isn't a bot answering you — this is real, coach-verified feedback based on your body, goals, and progress.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 w-4 h-4 rounded-full mt-1 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Stay Anonymous</h3>
                <p className="text-gray-300">You stay anonymous — I personally answer your questions each morning and guide you through the tools.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 w-4 h-4 rounded-full mt-1 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Personal Coaching Available</h3>
                <p className="text-gray-300">If you want personal coaching, that's available as a separate service with exclusive member discounts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Service Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Anonymous Questions */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-green-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Anonymous Questions</h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="text-green-400" size={20} />
                <h4 className="text-white font-bold">Ask Anything</h4>
              </div>
              <p className="text-gray-300 text-sm">Get answers about training, nutrition, measurements, or progress without revealing your identity.</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="text-yellow-400" size={20} />
                <h4 className="text-white font-bold">Daily Responses</h4>
              </div>
              <p className="text-gray-300 text-sm">I personally answer questions each morning with detailed, personalized guidance.</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-blue-400" size={20} />
                <h4 className="text-white font-bold">Community Support</h4>
              </div>
              <p className="text-gray-300 text-sm">Join a community of serious bodybuilders working towards their goals.</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleFreeAccess}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:transform hover:scale-105 shadow-lg w-full justify-center"
            >
              <MessageCircle size={24} />
              <div className="text-left">
                <div className="text-lg">Ask Anonymous Questions</div>
                <div className="text-sm opacity-90">Free community support</div>
              </div>
            </button>
          </div>
        </div>

        {/* Exclusive Member Access */}
        <div className="bg-gradient-to-br from-yellow-900 to-orange-900 rounded-xl p-8 shadow-2xl border border-yellow-600">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="text-yellow-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Exclusive Member Access</h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-yellow-500">
              <div className="flex items-center gap-3 mb-2">
                <Star className="text-yellow-400" size={20} />
                <h4 className="text-white font-bold">VIP Discord Role</h4>
              </div>
              <p className="text-gray-300 text-sm">Get exclusive access to member-only channels and priority support.</p>
            </div>

            <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-yellow-500">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="text-green-400" size={20} />
                <h4 className="text-white font-bold">Exclusive Discounts</h4>
              </div>
              <p className="text-gray-300 text-sm">Special member pricing on one-on-one coaching and advanced programs.</p>
            </div>

            <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-yellow-500">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-blue-400" size={20} />
                <h4 className="text-white font-bold">Priority Booking</h4>
              </div>
              <p className="text-gray-300 text-sm">First access to coaching slots and exclusive consultation sessions.</p>
            </div>

            <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-yellow-500">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="text-purple-400" size={20} />
                <h4 className="text-white font-bold">Advanced Support</h4>
              </div>
              <p className="text-gray-300 text-sm">Complex training questions, competition prep, and detailed program customization.</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleExclusiveAccess}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:transform hover:scale-105 shadow-lg w-full justify-center"
            >
              <Crown size={24} />
              <div className="text-left">
                <div className="text-lg">Get Exclusive Access</div>
                <div className="text-sm opacity-90">Unlock member benefits</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Comparison */}
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Service Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-4 px-4">Feature</th>
                <th className="text-center py-4 px-4 text-green-400">Anonymous Questions</th>
                <th className="text-center py-4 px-4 text-yellow-400">Exclusive Members</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Basic Training Questions</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Nutrition Guidance</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Daily Coach Responses</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">VIP Discord Role</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Exclusive Discounts</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Priority Support</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Competition Prep Guidance</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4">One-on-One Coaching Access</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};