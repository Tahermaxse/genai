// app/api/analyze/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as cheerio from "cheerio";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Interfaces
interface ScrapedData {
  url: string;
  title: string;
  description: string;
  headings: string[];
  ctaButtons: string[];
  adCopy: string[];
  images: string[];
}

interface AnalysisResult {
  hooks: {
    identified: string[];
    effectiveness: string;
    suggestions: string[];
  };
  cta: {
    patterns: string[];
    effectiveness: string;
    improvements: string[];
  };
  contentStrategy: {
    formats: string[];
    themes: string[];
    recommendations: string[];
  };
  competitors: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
  };
}

// Scraping function
async function scrapeWebsite(url: string): Promise<ScrapedData> {
  try {
    // Add timeout to avoid hanging on slow responses
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      maxRedirects: 5
    });

    const $ = cheerio.load(response.data);
    
    const scrapedData: ScrapedData = {
      url,
      title: $('title').text().trim(),
      description: $('meta[name="description"]').attr('content') || '',
      headings: [],
      ctaButtons: [],
      adCopy: [],
      images: []
    };

    // Extract headings
    $('h1, h2, h3').each((_, el) => {
      const text = $(el).text().trim();
      if (text) scrapedData.headings.push(text);
    });

    // Extract CTA buttons and links
    $('button, .btn, .button, a.cta, [class*="cta"], [class*="button"], a').each((_, el) => {
      const text = $(el).text().trim();
      if (text && !scrapedData.ctaButtons.includes(text)) {
        scrapedData.ctaButtons.push(text);
      }
    });

    // Extract potential ad copy and marketing text
    $('p, .ad, [class*="ad-"], [class*="advertisement"], [class*="promo"], [class*="marketing"], [class*="content"]').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 10) { // Avoid very short snippets
        scrapedData.adCopy.push(text);
      }
    });

    // Extract image information
    $('img').each((_, el) => {
      const alt = $(el).attr('alt');
      const title = $(el).attr('title');
      if (alt && alt.length > 3) scrapedData.images.push(alt);
      if (title && title.length > 3) scrapedData.images.push(title);
    });

    // Limit array sizes to prevent oversized responses
    scrapedData.headings = scrapedData.headings.slice(0, 10);
    scrapedData.ctaButtons = scrapedData.ctaButtons.slice(0, 10);
    scrapedData.adCopy = scrapedData.adCopy.slice(0, 10);
    scrapedData.images = scrapedData.images.slice(0, 10);

    return scrapedData;

  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    if (error instanceof Error) {
      throw new Error(`Failed to scrape ${url}: ${error.message}`);
    } else {
      throw new Error(`Failed to scrape ${url}: Unknown error`);
    }
  }
}

// Analysis function
async function analyzeWithGemini(scrapedData: ScrapedData[]): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `You are a JSON-only response API. Analyze these competitor websites and their advertising strategies.
  
  Raw Data to Analyze:
  ${JSON.stringify(scrapedData, null, 2)}
  
  Instructions:
  1. Analyze the marketing strategies, hooks, CTAs, and content
  2. Respond ONLY with a valid JSON object
  3. Do not include any explanation text, markdown formatting, or code blocks
  4. Ensure all properties use proper JSON string escaping
  
  Expected Response Structure:
  {
    "hooks": {
      "identified": ["hook1", "hook2"],
      "effectiveness": "single string analysis",
      "suggestions": ["suggestion1", "suggestion2"]
    },
    "cta": {
      "patterns": ["pattern1", "pattern2"],
      "effectiveness": "single string analysis",
      "improvements": ["improvement1", "improvement2"]
    },
    "contentStrategy": {
      "formats": ["format1", "format2"],
      "themes": ["theme1", "theme2"],
      "recommendations": ["recommendation1", "recommendation2"]
    },
    "competitors": {
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "opportunities": ["opportunity1", "opportunity2"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw Gemini response:', text);

    let cleanedJson = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*$/g, '')
      .replace(/^\s*{\s*/, '{')
      .replace(/\s*}\s*$/, '}')
      .trim();

    console.log('Cleaned JSON:', cleanedJson);

    if (!cleanedJson.startsWith('{') || !cleanedJson.endsWith('}')) {
      throw new Error('Invalid JSON structure');
    }

    const parsed = JSON.parse(cleanedJson);
    
    // Validate required properties
    const requiredProps = ['hooks', 'cta', 'contentStrategy', 'competitors'];
    for (const prop of requiredProps) {
      if (!parsed[prop]) {
        throw new Error(`Missing required property: ${prop}`);
      }
    }

    return parsed as AnalysisResult;
  } catch (error ) {
    console.error('Analysis Error:', error);
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    } else {
      throw new Error('Analysis failed: Unknown error');
    }
  }
}

// API Route handler
export async function POST(request: Request) {
  try {
    const { urls } = await request.json();
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid or empty URLs array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Scrape all websites with error handling
    const scrapedData = [];
    for (const url of urls) {
      try {
        const data = await scrapeWebsite(url);
        scrapedData.push(data);
      } catch (error) {
        console.error(`Failed to scrape ${url}:`, error);
        // Continue with other URLs if one fails
      }
    }

    if (scrapedData.length === 0) {
      return new Response(JSON.stringify({ error: 'Failed to scrape any websites' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Analyze the scraped data
    try {
      const analysis = await analyzeWithGemini(scrapedData);
      
      return new Response(JSON.stringify({
        scrapedData,
        analysis
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}