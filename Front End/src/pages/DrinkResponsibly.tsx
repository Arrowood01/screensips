import React from 'react';
import { Shield, AlertTriangle, Heart, Users } from 'lucide-react';
import SEO from '../components/SEO';

const DrinkResponsibly: React.FC = () => {
  return (
    <>
      <SEO
        title="Drink Responsibly - Screen Sips Safety Guidelines"
        description="Learn about responsible drinking practices and safety guidelines for enjoying Screen Sips drinking games. Stay safe while having fun with friends."
        keywords="drink responsibly, drinking game safety, responsible drinking, alcohol safety, party safety, drinking guidelines"
        url="/drink-responsibly"
      />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              Drink Responsibly
            </h1>
            <p className="text-xl text-amber-200/80 leading-relaxed">
              Have fun, stay safe, and make memories that last
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 text-center mb-8">
            <Shield className="text-orange-400 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-amber-100 mb-4">Your Safety Matters</h2>
            <p className="text-amber-200/80">
              Screen Sips is designed for adults of legal drinking age who want to enhance their entertainment experience safely. 
              We believe in having fun while prioritizing your well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="hover-card p-6">
              <AlertTriangle className="card-icon text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold text-amber-100 mb-4">Know Your Limits</h3>
              <ul className="text-amber-200/80 space-y-2 text-left">
                <li>• Drink at your own pace</li>
                <li>• Stay hydrated with water</li>
                <li>• Eat before and during drinking</li>
                <li>• Listen to your body</li>
              </ul>
            </div>

            <div className="hover-card p-6">
              <Heart className="card-icon text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold text-amber-100 mb-4">Look Out for Friends</h3>
              <ul className="text-amber-200/80 space-y-2 text-left">
                <li>• Check in with each other</li>
                <li>• Have a designated driver</li>
                <li>• Know the signs of overconsumption</li>
                <li>• Have emergency contacts ready</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 mb-8">
            <h3 className="text-2xl font-bold text-amber-100 mb-6 text-center">Important Guidelines</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-400 text-amber-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-amber-100 mb-2">Legal Drinking Age</h4>
                  <p className="text-amber-200/80">Screen Sips is intended for adults of legal drinking age in their jurisdiction. Please respect local laws and regulations.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-400 text-amber-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-amber-100 mb-2">Never Drink and Drive</h4>
                  <p className="text-amber-200/80">Always have a designated driver, use rideshare services, or stay overnight. Your safety and the safety of others is paramount.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-400 text-amber-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-amber-100 mb-2">Moderation is Key</h4>
                  <p className="text-amber-200/80">Enjoy the games and cocktails in moderation. Remember, the goal is to enhance your entertainment experience, not to overindulge.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-400 text-amber-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-amber-100 mb-2">Health Considerations</h4>
                  <p className="text-amber-200/80">If you have health conditions, are pregnant, or take medications, consult with a healthcare professional before consuming alcohol.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 text-center">
            <Users className="text-orange-400 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-amber-100 mb-4">Have Fun, Stay Safe</h3>
            <p className="text-amber-200/80 text-lg leading-relaxed">
              Screen Sips is about creating memorable experiences with friends and family. 
              By drinking responsibly, you ensure that everyone has a great time and goes home safely.
            </p>
            <p className="text-amber-200/60 mt-4 italic">
              Remember: The best memories are made when everyone stays safe and has fun together.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrinkResponsibly;