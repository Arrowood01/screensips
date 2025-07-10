Backend Planning Document: Movie Drinking Game Generator
This document outlines the steps to implement the backend logic for your Movie Drinking Game Generator, leveraging Supabase for data storage and a Vercel serverless function to be triggered by your "Claude code" agent.

I. Supabase Database Setup
The first step is to prepare your Supabase project to store the generated drinking game data.

1. Create a New Table:

In your Supabase project dashboard, navigate to the "Table Editor" or "Database" section.

Create a new table named drinking_games.

2. Define Table Columns:
Add the following columns to the drinking_games table:

id: UUID (Primary Key, Default Value: gen_random_uuid()) - Unique identifier for each game.

movie_title: TEXT (NOT NULL) - The title of the movie/TV show.

tagline: TEXT (NOT NULL) - The humorous tagline for the game.

rules: JSONB (NOT NULL) - An array of strings for the drinking rules. This is ideal for storing JSON data directly.

cocktail_name: TEXT (NOT NULL) - The name of the themed cocktail.

cocktail_ingredients: JSONB (NOT NULL) - An array of strings for cocktail ingredients.

cocktail_instructions: JSONB (NOT NULL) - An array of strings for cocktail instructions.

created_at: TIMESTAMP WITH TIME ZONE (Default Value: now()) - Automatically records when the entry was created.

3. Set Up Row Level Security (RLS):

Enable RLS for the drinking_games table.

Create a policy that allows INSERT operations for authenticated users (or anonymous if you don't plan to have user accounts in Phase 1). For simplicity initially, you might allow SELECT for everyone if you want to display recent/trending games publicly without authentication.

Example RLS Policy for INSERT (assuming authenticated users):

CREATE POLICY "Enable insert for authenticated users only" ON "public"."drinking_games"
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

(Adjust authenticated to anon if you want to allow anonymous inserts, but this is less secure for production.)

II. Vercel Serverless Function (API Endpoint)
This function will act as the intermediary between your frontend/Claude agent and the Gemini API/Supabase.

1. Create a New Vercel Project/Function:

In your Vercel dashboard, create a new project or add a new serverless function to an existing project.

Choose Node.js (or Python, if that's what your Claude agent prefers to interact with for backend calls, but Node.js is common for Vercel). Let's assume Node.js for this plan.

Create a file (e.g., api/generate-game.js for Node.js).

2. Install Dependencies:

You'll need the Supabase client library and potentially a library for making HTTP requests (like node-fetch if not using built-in fetch in Node.js 18+).

npm install @supabase/supabase-js node-fetch (if using Node.js)

3. Implement the Serverless Function Logic:

Endpoint: This function will expose an API endpoint (e.g., /api/generate-game) that your frontend will call.

Request Method: It should primarily handle POST requests.

Input: Expect a JSON body containing the movieTitle from your frontend.

// api/generate-game.js (Node.js example)
import { createClient } from '@supabase/supabase-js';

// Vercel environment variables (set these in Vercel project settings)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // Or service role key for backend
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Your actual Gemini API Key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); // Use service role key if needed for RLS bypass

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { movieTitle } = req.body;

  if (!movieTitle) {
    return res.status(400).json({ message: 'Movie title is required.' });
  }

  try {
    // --- Step 1: Call Gemini API ---
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const prompt = `Create a fun drinking game for the movie "${movieTitle}". It should include:
    1. A short, humorous tagline.
    2. 8-12 rules using events, character tropes, and common plot points. Each rule should be a concise phrase.
    3. A theme cocktail suggestion with a creative name, ingredients (list each ingredient), and instructions (list each step).

    Format the output as a JSON object with the following structure:
    {
      "tagline": "string",
      "rules": ["string", "string", ...],
      "cocktailName": "string",
      "cocktailIngredients": ["string", "string", ...],
      "cocktailInstructions": ["string", "string", ...]
    }
    `;

    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "tagline": { "type": "STRING" },
            "rules": { "type": "ARRAY", "items": { "type": "STRING" } },
            "cocktailName": { "type": "STRING" },
            "cocktailIngredients": { "type": "ARRAY", "items": { "type": "STRING" } },
            "cocktailInstructions": { "type": "ARRAY", "items": { "type": "STRING" } }
          },
          "required": ["tagline", "rules", "cocktailName", "cocktailIngredients", "cocktailInstructions"]
        }
      }
    };

    const geminiResponse = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorData.error.message || 'Unknown error'}`);
    }

    const geminiResult = await geminiResponse.json();
    let generatedGameData;

    if (geminiResult.candidates && geminiResult.candidates.length > 0 &&
        geminiResult.candidates[0].content && geminiResult.candidates[0].content.parts &&
        geminiResult.candidates[0].content.parts.length > 0) {
      const jsonString = geminiResult.candidates[0].content.parts[0].text;
      generatedGameData = JSON.parse(jsonString);
    } else {
      throw new Error("Gemini API did not return expected content structure.");
    }

    // --- Step 2: Store in Supabase ---
    const { data, error } = await supabase
      .from('drinking_games')
      .insert([
        {
          movie_title: movieTitle,
          tagline: generatedGameData.tagline,
          rules: generatedGameData.rules, // JSONB handles arrays directly
          cocktail_name: generatedGameData.cocktailName,
          cocktail_ingredients: generatedGameData.cocktailIngredients,
          cocktail_instructions: generatedGameData.cocktailInstructions,
        },
      ])
      .select(); // Use .select() to get the inserted data back

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(`Supabase error: ${error.message}`);
    }

    // --- Step 3: Respond to Frontend ---
    res.status(200).json({
      message: 'Drinking game generated and stored successfully!',
      game: generatedGameData, // Send the generated data back to the frontend
      storedRecord: data[0] // Optionally send the stored record details
    });

  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ message: 'Failed to generate or store drinking game.', error: error.message });
  }
}

4. Secure Environment Variables:

Crucial: Do NOT hardcode your Supabase URL, Supabase Anon Key (or Service Role Key), or Gemini API Key directly in the code.

In your Vercel project settings, go to "Settings" -> "Environment Variables" and add:

SUPABASE_URL

SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY if you need to bypass RLS for backend writes)

GEMINI_API_KEY

III. Claude Code (No-Code Agent) Integration
Since "Claude code" is a no-code agent that runs on Antrhopic's AI Claude, its interaction with the Vercel function will depend on how it's configured to make HTTP requests. The general flow will be:

1. Triggering the Claude Agent:

Your frontend (Bolt/React) will not directly call the Gemini API anymore.

Instead, when the user clicks "Generate Game," your frontend will make a POST request to your Vercel serverless function (e.g., /api/generate-game), passing the movieTitle in the request body.

2. Claude Agent's Role (Conceptual):

The "Claude code" agent would likely be configured within Cursor (or wherever it's deployed) to monitor or be triggered by specific events.

Option A (Less likely for direct backend): If Claude code itself is intended to be the HTTP endpoint, it would need to expose an API that your frontend calls. This is less common for "no-code agents" acting as a backend.

Option B (More likely for this setup): The Vercel Serverless Function is your backend. The "Claude code" agent would be used for other logic, perhaps for more complex "Phase 2" features like analyzing trending games, or if you wanted Claude to somehow orchestrate the call to this Vercel function (though that seems redundant if the frontend can call it directly).

Given your description, the Vercel Serverless Function is the primary backend component that handles the Gemini API call and Supabase storage. The "Claude code" agent might be used for:

Orchestration: If you have a more complex workflow where Claude needs to decide when to generate a game or trigger other actions based on certain conditions.

Post-processing/Analysis (Phase 2): Claude could be used to analyze the drinking_games data in Supabase (e.g., to identify trending games, generate summaries, etc.) as part of Phase 2.

Admin Tasks: Claude could be set up to perform administrative tasks like reviewing generated games, or triggering bulk generation.

For the immediate goal of generating and storing a game: Your frontend will call the Vercel Serverless Function directly. The "Claude code" agent is not strictly necessary for this core flow if it's just about making an API call and saving data.

IV. Frontend Integration (Bolt/React)
Your existing Bolt/React frontend will need a small modification:

1. Update the generateDrinkingGame function:

Instead of calling the apiUrl (Gemini API directly), you will now call your Vercel serverless function's URL.

The movieTitle will be sent in the body of the POST request.

// Inside your App component's generateDrinkingGame function
const generateDrinkingGame = async () => {
  setLoading(true);
  setError(null);
  setGeneratedContent(null);

  // Replace the Gemini API URL with your Vercel Function URL
  const backendApiUrl = '/api/generate-game'; // Or your full Vercel deployment URL if developing locally

  try {
    const response = await fetch(backendApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieTitle: movieTitle }) // Send movieTitle in the body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Backend API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();
    // The backend now sends back the 'game' object which is the same structure as before
    setGeneratedContent(result.game);

  } catch (err) {
    console.error("Error generating content via backend:", err);
    setError(`Failed to generate content: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

V. Deployment
1. Deploy Vercel Serverless Function:

Push your Vercel project to a Git repository (e.g., GitHub).

Vercel will automatically detect the serverless function and deploy it.

Crucially, ensure all environment variables (SUPABASE_URL, SUPABASE_ANON_KEY, GEMINI_API_KEY) are correctly set in your Vercel project settings.

2. Deploy Frontend:

Deploy your Bolt/React frontend (also likely via Vercel). Ensure it's configured to call the correct backend URL. If both are on the same Vercel project, relative paths like /api/generate-game will work automatically.

This plan provides a robust and scalable way to handle your movie drinking game generation and storage. The Vercel serverless function centralizes the logic, keeps your API keys secure, and allows for easy integration with Supabase.