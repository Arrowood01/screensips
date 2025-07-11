import { GenerateGameRequest, GenerateGameResponse, ApiError } from '../types';

const API_BASE_URL = '/api';

/**
 * Generic API call function with error handling
 */
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

/**
 * Generate a drinking game for a movie or TV show
 */
export async function generateGame(movieTitle: string): Promise<GenerateGameResponse> {
  return apiCall<GenerateGameResponse>('/generate-game', {
    method: 'POST',
    body: JSON.stringify({ movieTitle: movieTitle.trim() }),
  });
}

/**
 * Health check for the API
 */
export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  return apiCall<{ status: string; timestamp: string }>('/health-check');
}

/**
 * Validate movie title input
 */
export function validateMovieTitle(title: string): { isValid: boolean; error?: string } {
  const trimmedTitle = title.trim();
  
  if (!trimmedTitle) {
    return { isValid: false, error: 'Please enter a movie or TV show title' };
  }
  
  if (trimmedTitle.length < 2) {
    return { isValid: false, error: 'Title must be at least 2 characters long' };
  }
  
  if (trimmedTitle.length > 100) {
    return { isValid: false, error: 'Title must be less than 100 characters' };
  }
  
  // Basic profanity/content filter
  const inappropriateWords = ['inappropriate', 'words', 'here'];
  const lowerTitle = trimmedTitle.toLowerCase();
  
  for (const word of inappropriateWords) {
    if (lowerTitle.includes(word)) {
      return { isValid: false, error: 'Please enter an appropriate title' };
    }
  }
  
  return { isValid: true };
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred. Please try again.';
} 