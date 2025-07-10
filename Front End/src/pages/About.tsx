import React from 'react';
import { Zap, Heart, Users, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
            About Screen Sips
          </h1>
          <p className="text-xl text-amber-200/80 leading-relaxed">
            Where AI meets entertainment to create unforgettable drinking game experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="hover-card p-8">
            <Zap className="card-icon text-orange-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-amber-100 mb-4">AI-Powered Fun</h3>
            <p className="text-amber-200/80 leading-relaxed">
              Our advanced AI analyzes your favorite shows and movies to create unique, 
              hilarious drinking game rules that perfectly capture the essence of each title.
            </p>
          </div>

          <div className="hover-card p-8">
            <Heart className="card-icon text-orange-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-amber-100 mb-4">Made with Love</h3>
            <p className="text-amber-200/80 leading-relaxed">
              Created by entertainment enthusiasts who believe that watching your favorite 
              content should be a social, interactive experience that brings people together.
            </p>
          </div>

          <div className="hover-card p-8">
            <Users className="card-icon text-orange-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-amber-100 mb-4">Community First</h3>
            <p className="text-amber-200/80 leading-relaxed">
              We're building a community of entertainment lovers who want to enhance their 
              viewing experiences. Every game is designed to spark conversation and laughter.
            </p>
          </div>

          <div className="hover-card p-8">
            <Sparkles className="card-icon text-orange-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-amber-100 mb-4">Always Fresh</h3>
            <p className="text-amber-200/80 leading-relaxed">
              With thousands of possible combinations and constantly updated content, 
              you'll never run out of new and exciting drinking games to try.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 text-center">
          <h2 className="text-3xl font-bold text-amber-100 mb-4">Our Mission</h2>
          <p className="text-amber-200/80 text-lg leading-relaxed mb-6">
            To transform ordinary movie nights into extraordinary social experiences through the power of AI-generated entertainment. 
            We believe that the best memories are made when people come together to laugh, drink responsibly, and enjoy great content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="liquid-button">
              Start Your Game
            </button>
            <button className="liquid-button">
              Join Our Community
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-amber-100 mb-4">Remember</h3>
          <p className="text-amber-200/60 italic">
            Always drink responsibly and never drink and drive. Screen Sips is designed for adults of legal drinking age who want to enhance their entertainment experience safely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;