-- Create drinking_games table
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

-- Enable Row Level Security
ALTER TABLE drinking_games ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON drinking_games
  FOR SELECT USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON drinking_games
  FOR INSERT WITH CHECK (true);