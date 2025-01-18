// app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface SearchResult {
  marketingBlogs: string[];
  competitorWebsites: string[];
  industryReports: string[];
  socialMediaDiscussions: string[];
  reviewPlatforms: string[];
  relevantForums: string[];
}

// Function to clean JSON string from markdown and other formatting
function cleanJsonResponse(text: string): string {
  // Remove markdown code blocks if present
  let cleaned = text.replace(/```json\n/, '').replace(/\n```$/, '');
  
  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();
  
  // If the response still starts with a { and ends with }, it's likely valid JSON
  if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
    return cleaned;
  }
  
  throw new Error('Invalid JSON structure in response');
}

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not defined');
      return new Response(JSON.stringify({ error: 'API key configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let userInput;
    try {
      const body = await request.json();
      userInput = body.userInput;
      console.log('Research topic:', userInput);
    } catch (error) {
      console.error('Error parsing request:', error);
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!userInput) {
      return new Response(JSON.stringify({ error: 'Search topic is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prompt = `For advertising research on "${userInput}", provide the most valuable URLs for market research and competitor analysis. Focus on high-authority sources and recent content. Return ONLY a JSON object with no additional text or markdown formatting in the following structure:
    {
      "marketingBlogs": ["URLs of relevant marketing blog posts and articles"],
      "competitorWebsites": ["URLs of direct and indirect competitors"],
      "industryReports": ["URLs of market research reports and industry analyses"],
      "socialMediaDiscussions": ["URLs of relevant Reddit threads, Twitter discussions, LinkedIn posts"],
      "reviewPlatforms": ["URLs of product/service review pages, app store reviews"],
      "relevantForums": ["URLs of discussions in industry forums, Quora, Stack Exchange"]
    }
    
    Important:
    - Return ONLY the JSON object with no markdown formatting or additional text
    - Prioritize sources from the last 2 years
    - Include only direct URLs (no search result pages)
    - Focus on sources with substantial market data
    - Ensure links are from reputable sources`;

    console.log('Sending research prompt to Gemini');

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw response from Gemini:', text);

    // Clean and parse the response
    let parsedResponse: SearchResult;
    try {
      const cleanedJson = cleanJsonResponse(text);
      console.log('Cleaned JSON:', cleanedJson);
      parsedResponse = JSON.parse(cleanedJson);
    } catch (error) {
      console.error('Error parsing response:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to parse response',
        rawResponse: text 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}