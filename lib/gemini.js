import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateWithGemini(movieTitle) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  const prompt = `Create a drinking game for the movie "${movieTitle}". 

  Generate a JSON response with this exact structure:
  {
    "tagline": "A fun, creative tagline for this drinking game (max 100 characters)",
    "rules": [
      "Rule 1: Take a sip when...",
      "Rule 2: Take a drink when...",
      "Rule 3: Finish your drink when...",
      "Rule 4: Take a shot when...",
      "Rule 5: Everyone drinks when..."
    ],
    "cocktail": {
      "name": "Movie-themed cocktail name",
      "ingredients": [
        "Ingredient 1 with measurement",
        "Ingredient 2 with measurement",
        "Ingredient 3 with measurement"
      ],
      "instructions": [
        "Step 1: Preparation instruction",
        "Step 2: Mixing instruction",
        "Step 3: Serving instruction"
      ]
    }
  }

  Requirements:
  - Create exactly 5 drinking rules specific to common tropes, character actions, or memorable scenes from "${movieTitle}"
  - Make rules fun but responsible (no excessive drinking triggers)
  - Create a themed cocktail that relates to the movie's setting, characters, or themes
  - Use realistic cocktail ingredients that can be found in most bars
  - Keep the tagline catchy and movie-specific
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
    
    if (!Array.isArray(gameData.rules) || gameData.rules.length !== 5) {
      throw new Error('Invalid rules array from Gemini')
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