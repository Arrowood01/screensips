export function validateMovieTitle(movieTitle) {
  // Check if movie title is provided
  if (!movieTitle) {
    return {
      isValid: false,
      error: 'Movie title is required'
    }
  }

  // Check if it's a string
  if (typeof movieTitle !== 'string') {
    return {
      isValid: false,
      error: 'Movie title must be a string'
    }
  }

  // Trim whitespace
  const trimmedTitle = movieTitle.trim()

  // Check if empty after trimming
  if (trimmedTitle.length === 0) {
    return {
      isValid: false,
      error: 'Movie title cannot be empty'
    }
  }

  // Check length constraints
  if (trimmedTitle.length > 100) {
    return {
      isValid: false,
      error: 'Movie title must be 100 characters or less'
    }
  }

  if (trimmedTitle.length < 1) {
    return {
      isValid: false,
      error: 'Movie title must be at least 1 character'
    }
  }

  // Check for potentially harmful characters
  const dangerousChars = /<script|javascript:|data:|vbscript:|onload|onerror/i
  if (dangerousChars.test(trimmedTitle)) {
    return {
      isValid: false,
      error: 'Movie title contains invalid characters'
    }
  }

  // Basic SQL injection prevention
  const sqlInjectionPattern = /('|(--|\/\*|\*\/)|(<|>)|(\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b))/i
  if (sqlInjectionPattern.test(trimmedTitle)) {
    return {
      isValid: false,
      error: 'Movie title contains invalid characters'
    }
  }

  return {
    isValid: true,
    sanitized: trimmedTitle
  }
}

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .substring(0, 100) // Limit length
}