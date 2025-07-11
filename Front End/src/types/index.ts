// Core application types

export interface Cocktail {
  name: string;
  ingredients: string[];
  instructions: string[];
}

export interface GameResult {
  title: string;
  tagline?: string;
  rules: string[];
  cocktail: Cocktail;
  error?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
}

// API response types
export interface GenerateGameRequest {
  movieTitle: string;
}

export interface GenerateGameResponse {
  success: boolean;
  data?: {
    movieTitle: string;
    tagline?: string;
    rules: string[];
    cocktail: Cocktail;
  };
  message?: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
}

// Component prop types
export interface TypewriterAnimationProps {
  className?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
} 