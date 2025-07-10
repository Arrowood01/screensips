import React from 'react';
import { Shield, AlertTriangle, Phone, Users } from 'lucide-react';

const DrinkResponsibly: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="text-orange-400 mx-auto mb-4" size={64} />
          <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
            Drink Responsibly
          </h1>
          <p className="text-xl text-amber-200/80 leading-relaxed">
            Your safety and well-being are our top priorities
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
            <div className="flex items-center mb-4">
              <AlertTriangle className="text-orange-400 mr-3" size={32} />
              <h2 className="text-2xl font-bold text-amber-100">Important Guidelines</h2>
            </div>
            <ul className="space-y-4 text-amber-200/80">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>You must be 21 or older (or legal drinking age in your jurisdiction) to participate</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Never drink and drive - always have a designated driver or use rideshare services</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Know your limits and drink at your own pace</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Always eat food before and during drinking</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Stay hydrated with water between alcoholic beverages</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
            <div className="flex items-center mb-4">
              <Users className="text-orange-400 mr-3" size={32} />
              <h2 className="text-2xl font-bold text-amber-100">Game Modifications</h2>
            </div>
            <p className="text-amber-200/80 mb-4">
              Feel free to modify our games to suit your group's comfort level:
            </p>
            <ul className="space-y-3 text-amber-200/80">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Replace alcoholic drinks with non-alcoholic alternatives</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use smaller portions or take sips instead of full drinks</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Skip rules that would result in excessive drinking</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Create "safe words" to pause the game if needed</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-500/20 backdrop-blur-lg rounded-xl p-8 border border-orange-500/30">
            <div className="flex items-center mb-4">
              <Phone className="text-orange-400 mr-3" size={32} />
              <h2 className="text-2xl font-bold text-amber-100">Emergency Resources</h2>
            </div>
            <p className="text-amber-200/80 mb-4">
              If you or someone you know is struggling with alcohol abuse, help is available:
            </p>
            <div className="space-y-3 text-amber-200/80">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span><strong>SAMHSA National Helpline:</strong> 1-800-662-4357</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span><strong>Crisis Text Line:</strong> Text HOME to 741741</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span><strong>Alcoholics Anonymous:</strong> aa.org</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 text-center">
            <h2 className="text-2xl font-bold text-amber-100 mb-4">Our Commitment</h2>
            <p className="text-amber-200/80 leading-relaxed">
              Screen Sips is committed to promoting responsible drinking and creating a safe, fun environment for all users. 
              We encourage social interaction and entertainment while prioritizing safety and well-being. 
              Remember, the best nights are the ones you can remember!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkResponsibly;