import { supabase } from '../lib/supabase.js'
import { generateWithGemini } from '../lib/gemini.js'
import { validateMovieTitle } from '../lib/validation.js'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { movieTitle } = req.body

    // Validate input
    const validation = validateMovieTitle(movieTitle)
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error
      })
    }

    // Generate game using Gemini AI
    const gameData = await generateWithGemini(movieTitle)
    
    // Store in database
    const { data, error } = await supabase
      .from('drinking_games')
      .insert([{
        movie_title: movieTitle,
        tagline: gameData.tagline,
        rules: gameData.rules,
        cocktail_name: gameData.cocktail.name,
        cocktail_ingredients: gameData.cocktail.ingredients,
        cocktail_instructions: gameData.cocktail.instructions
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to save game data'
      })
    }

    // Return formatted response
    res.status(200).json({
      success: true,
      message: 'Game generated successfully',
      data: {
        id: data.id,
        movieTitle: data.movie_title,
        tagline: data.tagline,
        rules: data.rules,
        cocktail: {
          name: data.cocktail_name,
          ingredients: data.cocktail_ingredients,
          instructions: data.cocktail_instructions
        },
        createdAt: data.created_at
      }
    })

  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}