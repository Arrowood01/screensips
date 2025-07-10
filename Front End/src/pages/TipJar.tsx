import React from 'react';
import { Coffee } from 'lucide-react';

const TipJar: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Coffee className="text-orange-400 mx-auto mb-4" size={64} />
          <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
            Tip Jar
          </h1>
          <p className="text-xl text-amber-200/80 leading-relaxed">
            We're your digital bartender. If this made your night, help keep the taps flowing.
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 text-center mb-8">
          <Coffee className="text-orange-400 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-amber-100 mb-4">Support ScreenSips</h2>
          <p className="text-amber-200/80 mb-6">
            Love the games? Help us keep creating amazing drinking experiences for movie lovers everywhere.
          </p>
          <a
            href="https://ko-fi.com/screensips"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-amber-100 font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg mr-4 mb-4"
          >
            <Coffee className="mr-3" size={24} />
            Support on Ko-fi
          </a>
          <a
            href="https://ko-fi.com/screensips"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-slate-700/50 text-amber-200 font-medium rounded-lg hover:bg-slate-600/50 transition-all border border-amber-200/20"
          >
            View Our Ko-fi Page
          </a>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
          <h3 className="text-2xl font-bold text-amber-100 mb-6 text-center">What Your Support Helps With</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-amber-100 mb-1">Server Costs</h4>
                <p className="text-amber-200/70 text-sm">Keep the AI running smoothly for everyone</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-amber-100 mb-1">New Features</h4>
                <p className="text-amber-200/70 text-sm">More games, better cocktails, enhanced UI</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-amber-100 mb-1">Community Events</h4>
                <p className="text-amber-200/70 text-sm">Virtual game nights and competitions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-amber-100 mb-1">Content Creation</h4>
                <p className="text-amber-200/70 text-sm">Enhanced AI and better game generation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-amber-200/60 mb-4">
            Every contribution, no matter how small, helps us keep the drinks flowing and the fun going!
          </p>
          <p className="text-amber-200/40 text-sm">
            Thank you for being part of the Screen Sips community 🍻
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipJar;