import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateWithGemini(movieTitle) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  const prompt = `Create a fun and highly specific drinking game for the movie "${movieTitle}".
It should include:
1. A short, humorous, and catchy tagline.
2. **10-12 distinct and highly movie-specific rules.** Each rule should reference:
   * **Iconic lines or quotes.**
   * **Memorable visual gags or recurring events.**
   * **Specific character quirks or running jokes.**
   * **Key plot points or predictable moments.**
   Each rule should be concise, witty, and clearly tied to an event that a viewer who has watched the movie would immediately recognize. Make sure the rules are varied in their trigger (e.g., a character action, a specific sound, a visual cue).
3. A creative theme cocktail suggestion with a unique name, a list of 5-7 ingredients, and clear step-by-step instructions (3-5 steps).

Format the output as a JSON object with the following structure:
{
  "tagline": "string",
  "rules": ["string", "string", ...],
  "cocktail": {
    "name": "string",
    "ingredients": ["string", "string", ...],
    "instructions": ["string", "string", ...]
  }
}

Requirements:
- Make rules fun but responsible (no excessive drinking triggers)
- Use realistic cocktail ingredients that can be found in most bars
- Return ONLY valid JSON, no additional text`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean up the response to ensure it's valid JSON
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    const gameData = JSON.parse(cleanedText)
    
    // Validate the structure
    if (!gameData.tagline || !gameData.rules || !gameData.cocktail) {
      throw new Error('Invalid response structure from Gemini')
    }
    
    if (!Array.isArray(gameData.rules) || gameData.rules.length < 10 || gameData.rules.length > 12) {
      throw new Error('Invalid rules array from Gemini - should have 10-12 rules')
    }
    
    if (!gameData.cocktail.name || !gameData.cocktail.ingredients || !gameData.cocktail.instructions) {
      throw new Error('Invalid cocktail structure from Gemini')
    }
    
    return gameData
    
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('Failed to generate drinking game content')
  }
}