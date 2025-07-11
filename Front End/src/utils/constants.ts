// Application constants and configuration

export const APP_CONFIG = {
  name: 'Screen Sips',
  description: 'AI-powered drinking game generator for movies and TV shows',
  url: 'https://screensips.com',
  version: '1.0.0',
} as const;

export const SEO_CONFIG = {
  defaultTitle: 'Screen Sips - AI-Powered Movie & TV Drinking Game Generator',
  defaultDescription: 'Generate hilarious drinking games and themed cocktails for your favorite movies and TV shows. AI-powered entertainment for movie nights with friends. Drink responsibly.',
  defaultKeywords: 'drinking games, movie drinking games, TV show drinking games, party games, movie night games, cocktail recipes, entertainment games, AI games',
  defaultImage: '/screensipslogo.png',
  url: 'https://screensips.com',
  twitterHandle: '@screensips',
} as const;

export const NAVIGATION = {
  items: [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/tip', label: 'Tip Jar' },
  ],
  footer: [
    { path: '/drink-responsibly', label: 'Drink Responsibly' },
    { path: '/terms', label: 'Terms' },
    { path: '/privacy', label: 'Privacy' },
  ],
} as const;

export const API_ENDPOINTS = {
  generateGame: '/api/generate-game',
  healthCheck: '/api/health-check',
} as const;

export const VALIDATION = {
  movieTitle: {
    minLength: 2,
    maxLength: 100,
  },
} as const;

export const ANALYTICS = {
  events: {
    appLoaded: 'app_loaded',
    gameGenerated: 'game_generated',
    errorOccurred: 'error_occurred',
  },
} as const;

export const EXTERNAL_LINKS = {
  koFi: 'https://ko-fi.com/screensips',
  support: 'https://ko-fi.com/screensips',
} as const;

export const THEME = {
  colors: {
    primary: '#f97316', // orange-500
    secondary: '#fbbf24', // amber-400
    background: '#0f172a', // slate-900
    surface: '#1e293b', // slate-800
    text: '#fef3c7', // amber-100
    textSecondary: '#fde68a', // amber-200
  },
} as const;

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const; 