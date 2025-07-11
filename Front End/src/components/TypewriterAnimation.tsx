import React, { useState, useEffect, useMemo, memo } from 'react';

const TypewriterAnimation: React.FC = memo(() => {
  const phrases = useMemo(() => [
    "May the drinks be with you.",
    "I love the smell of cocktails in the morning.",
    "Life is like a box of cocktails.",
    "You had me at Merlot.",
    "You're gonna need a bigger glass.",
    "Drunk. James Drunk.",
    "Keep your friends close and your chasers closer.",
    "Hasta la vodka, baby.",
    "Houston, we have a cocktail.",
    "I'm gonna make you a drink you can't refuse.",
    "Get in, loser. We're going drinking.",
    "That'll do, booze. That'll do.",
    "So you're telling me there's a drink?",
    "We'll always have cocktails.",
    "I see drunk people."
  ], []);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          // Finished typing, start deleting after pause
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500); // 1.5 second pause after complete phrase
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase after pause
          setTimeout(() => {
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }, 300); // 300ms pause before starting next phrase
        }
      }
    }, isDeleting ? 40 : 80); // 40ms for deleting, 80ms for typing

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <div className="text-center">
      <p className="text-lg md:text-xl text-orange-400 font-semibold min-h-[1.5em] flex items-center justify-center">
        {currentText}
        <span className="animate-pulse ml-1 text-orange-300">|</span>
      </p>
    </div>
  );
});

TypewriterAnimation.displayName = 'TypewriterAnimation';

export default TypewriterAnimation;