import React from 'react';
import { Beer, Server, Gamepad2, Palette } from 'lucide-react';

const TipJar: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
            Fuel the Fun - Support ScreenSips
          </h1>
          <p className="text-xl text-amber-200/80 leading-relaxed">
            Your support helps us create the ultimate drinking game experience for movie and TV lovers worldwide. Every contribution keeps the party going!
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 text-center mb-8">
          <Beer className="text-orange-400 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-amber-100 mb-4">Support ScreenSips</h2>
          <p className="text-amber-200/80 mb-6">
            Love the games? Help us keep creating amazing drinking experiences for movie lovers everywhere.
          </p>
          <a
            href="https://ko-fi.com/screensips"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-button inline-flex items-center"
          >
            <Beer className="mr-3" size={24} />
            Buy Us a Round
          </a>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
          <h3 className="text-2xl font-bold text-amber-100 mb-6 text-center">What Your Support Helps With</h3>
          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
            <div className="flex items-start space-x-4">
              <Server className="text-orange-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold text-amber-100 mb-2">
                  Server & Hosting
                </h4>
                <p className="text-amber-200/70">Keep our platform fast and reliable for thousands of daily players</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Gamepad2 className="text-orange-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold text-amber-100 mb-2">
                  New Game Modes
                </h4>
                <p className="text-amber-200/70">Unlock exciting new drinking games and custom rule sets</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Palette className="text-orange-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold text-amber-100 mb-2">
                  Content & Features
                </h4>
                <p className="text-amber-200/70">Develop new movie/TV show integrations and premium features</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-amber-200/60 mb-4">
            Every dollar makes a difference! Your support helps us build the best drinking game platform on the internet. Join our community of awesome supporters!
          </p>
          <p className="text-amber-200/40 text-sm">
            Cheers to being part of the Screen Sips family! 🍻
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipJar;