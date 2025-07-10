# Final Backend Plan - Movie Drinking Game Generator

## Overview
This document outlines the complete implementation plan for the ScreenSips Movie Drinking Game Generator backend, incorporating all necessary components and deployment strategies.

## Architecture
- **Frontend**: React/TypeScript (Vite) - Already implemented with mock data
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel for both frontend and backend

## Implementation Phases

### Phase 1: Core Backend Infrastructure (High Priority)

#### 1.1 Database Setup (Supabase)
- Create Supabase project and database
- Create `drinking_games` table with schema:
  ```sql
  CREATE TABLE drinking_games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie_title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    rules JSONB NOT NULL,
    cocktail_name TEXT NOT NULL,
    cocktail_ingredients JSONB NOT NULL,
    cocktail_instructions JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
  ```
- Set up Row Level Security (RLS) policies
- Configure API keys and access permissions

#### 1.2 Backend Directory Structure
Create the following structure:
```
/home/nic/ScreenSips/
├── api/
│   ├── generate-game.js          # Main serverless function
│   └── health-check.js           # Health check endpoint
├── lib/
│   ├── supabase.js              # Supabase client configuration
│   ├── gemini.js                # Gemini API integration
│   └── validation.js            # Input validation utilities
├── vercel.json                  # Vercel configuration
└── package.json                 # Backend dependencies
```

#### 1.3 Serverless Function Implementation
- **Main endpoint**: `/api/generate-game` (POST)
- **Input validation**: Movie title sanitization and validation
- **Gemini API integration**: Structured JSON response generation
- **Database storage**: Store generated games in Supabase
- **Error handling**: Comprehensive error responses
- **Response format**: Consistent JSON structure

#### 1.4 Environment Configuration
Required environment variables:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (or SERVICE_ROLE_KEY)
- `GEMINI_API_KEY`
- `NODE_ENV`

### Phase 2: Frontend Integration (High Priority)

#### 2.1 Frontend Updates
- Remove mock data from `Home.tsx`
- Implement real API calls to `/api/generate-game`
- Add proper error handling and loading states
- Update data structure to match backend response
- Add input validation on frontend

#### 2.2 API Integration
- Replace mock `handleGenerate` function
- Add retry logic for failed requests
- Implement proper error messaging
- Add loading animations and feedback

### Phase 3: Testing & Deployment (Medium Priority)

#### 3.1 Local Development Setup
- Set up Vercel CLI for local testing
- Create development environment variables
- Test API endpoints locally
- Verify database connections

#### 3.2 Production Deployment
- Deploy to Vercel production
- Configure production environment variables
- Set up custom domain (if needed)
- Configure CORS and security headers

#### 3.3 End-to-End Testing
- Test complete user flow
- Verify database storage
- Test error scenarios
- Performance testing

### Phase 4: Production Enhancements (Low Priority)

#### 4.1 Security & Validation
- Input sanitization
- Rate limiting
- API key security
- CORS configuration

#### 4.2 Monitoring & Logging
- Error tracking
- Performance monitoring
- Usage analytics
- Database query optimization

#### 4.3 Backup & Recovery
- Database backup strategy
- Error recovery procedures
- Rollback procedures

## Technical Specifications

### API Endpoints

#### POST `/api/generate-game`
**Request:**
```json
{
  "movieTitle": "string (required, max 100 chars)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Game generated successfully",
  "data": {
    "id": "uuid",
    "movieTitle": "string",
    "tagline": "string",
    "rules": ["string", "string", ...],
    "cocktail": {
      "name": "string",
      "ingredients": ["string", "string", ...],
      "instructions": ["string", "string", ...]
    },
    "createdAt": "timestamp"
  }
}
```

### Database Schema
```sql
-- drinking_games table
CREATE TABLE drinking_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  rules JSONB NOT NULL,
  cocktail_name TEXT NOT NULL,
  cocktail_ingredients JSONB NOT NULL,
  cocktail_instructions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_drinking_games_movie_title ON drinking_games(movie_title);
CREATE INDEX idx_drinking_games_created_at ON drinking_games(created_at DESC);
```

### Gemini API Integration
- Use `gemini-2.0-flash` model
- Structured JSON response with schema validation
- Proper error handling for API failures
- Rate limiting considerations

## Implementation Order

1. **Setup Backend Directory Structure**
2. **Create Supabase Database**
3. **Implement Serverless Functions**
4. **Update Frontend Integration**
5. **Local Testing & Debugging**
6. **Production Deployment**
7. **End-to-End Testing**
8. **Production Enhancements**

## Success Criteria
- [ ] User can input a movie title
- [ ] Backend generates unique drinking game via Gemini API
- [ ] Game is stored in Supabase database
- [ ] Frontend displays generated game correctly
- [ ] All error scenarios handled gracefully
- [ ] Production deployment is stable and secure

## Next Steps
Begin implementation with Phase 1.1 (Database Setup) and proceed through each phase systematically.