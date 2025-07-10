import React, { useState } from 'react';
import { Search, Dice6, Wine, Beer } from 'lucide-react';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameResult, setGameResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieTitle: searchTerm.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate game');
      }

      if (data.success) {
        setGameResult({
          title: data.data.movieTitle,
          tagline: data.data.tagline,
          rules: data.data.rules,
          cocktail: {
            name: data.data.cocktail.name,
            ingredients: data.data.cocktail.ingredients,
            instructions: data.data.cocktail.instructions
          }
        });
      } else {
        throw new Error(data.message || 'Failed to generate game');
      }
    } catch (error) {
      console.error('Error generating game:', error);
      // Show error message to user
      setGameResult({
        title: searchTerm,
        error: 'Failed to generate game. Please try again.',
        rules: [],
        cocktail: { name: '', ingredients: [], instructions: [] }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-100 mb-6 leading-tight">
            Movie & TV
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
              {" "}Drinking Game
            </span>
            <br />Generator
          </h1>
          <p className="text-xl md:text-2xl text-amber-200/80 mb-12 leading-relaxed">
            Enter a title, get a hilarious drinking game + themed cocktail.
            <br />
            <span className="text-orange-400 font-semibold">May the drinks be with you.</span>
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-200/60" size={24} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., The Office, Breaking Bad, Barbie"
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-lg border border-amber-200/20 rounded-xl text-amber-100 placeholder-amber-200/60 text-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!searchTerm.trim() || isLoading}
              className="liquid-button mt-4 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-amber-100/30 border-t-amber-100 rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Dice6 size={20} />
                  <span>Generate Game</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {gameResult && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-amber-200/20">
              <h2 className="text-3xl font-bold text-amber-100 mb-8 text-center">
                Your {gameResult.title} Game is Ready!
              </h2>
              {gameResult.tagline && (
                <p className="text-xl text-orange-400 text-center mb-8 italic">
                  {gameResult.tagline}
                </p>
              )}

              {gameResult.error ? (
                <div className="text-center py-8">
                  <p className="text-red-400 text-lg mb-4">{gameResult.error}</p>
                  <button
                    onClick={handleGenerate}
                    className="liquid-button"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Rules Section */}
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-amber-200/10">
                    <h3 className="text-2xl font-bold text-amber-100 mb-6 flex items-center">
                      <Dice6 className="mr-3 text-orange-400" size={28} />
                      The Rules
                    </h3>
                    <ul className="space-y-3">
                      {gameResult.rules.map((rule: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-amber-200/90 leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cocktail Section */}
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-amber-200/10">
                    <h3 className="text-2xl font-bold text-amber-100 mb-6 flex items-center">
                      <Wine className="mr-3 text-orange-400" size={28} />
                      Themed Cocktail
                    </h3>
                    <h4 className="text-xl font-semibold text-orange-400 mb-4">
                      {gameResult.cocktail.name}
                    </h4>
                    
                    <div className="mb-6">
                      <h5 className="font-semibold text-amber-100 mb-3">Ingredients:</h5>
                      <ul className="space-y-2">
                        {gameResult.cocktail.ingredients.map((ingredient: string, index: number) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-amber-200/90">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-amber-100 mb-3">Instructions:</h5>
                      <ol className="space-y-2">
                        {gameResult.cocktail.instructions.map((step: string, index: number) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="w-6 h-6 bg-orange-400 text-amber-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-amber-200/90">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-amber-300 text-sm italic text-center">
                  <strong>Disclaimer:</strong> Drink responsibly. This is intended for adults of legal drinking age. 
                  Don't be dumb—don\'t drink and drive.
                </p>
              </div>
            </div>

            {/* Monetization Panel */}
            <div className="mt-8 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-6 border border-amber-200/20 text-center">
              <h3 className="text-xl font-semibold text-amber-100 mb-4 flex items-center justify-center">
                <Beer className="mr-2 text-orange-400" size={24} />
                Enjoying the game? Tip the bartender
              </h3>
              <p className="text-amber-200/70 mb-4">
                Help keep the drinks flowing and support more awesome games!
              </p>
              <a
                href="https://ko-fi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-button inline-block"
              >
                Support on Ko-fi
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;