import React, { useState, useEffect } from 'react';

const TypewriterAnimation: React.FC = () => {
  const phrases = [
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
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isPaused) {
      return;
    }

    if (isTyping && !isDeleting) {
      // Typing phase
      if (currentText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, 80); // 80ms per character typing
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
        const timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
          setIsTyping(false);
        }, 1500); // 1.5 second pause after complete phrase
        return () => clearTimeout(timeout);
      }
    } else if (isDeleting) {
      // Deleting phase
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 40); // 40ms per character deletion
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, pause before next phrase
        setIsPaused(true);
        const timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 300); // 300ms pause before starting next phrase
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isTyping, isDeleting, isPaused, currentPhraseIndex, phrases]);

  return (
    <div className="text-center">
      <p className="text-lg md:text-xl text-orange-400 font-semibold min-h-[1.5em] flex items-center justify-center">
        {currentText}
        <span className="animate-pulse ml-1 text-orange-300">|</span>
      </p>
    </div>
  );
};

export default TypewriterAnimation;