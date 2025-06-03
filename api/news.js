// Vercel serverless function for news API
import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    const newsApiKey = process.env.NEWS_API_KEY || process.env.VITE_NEWS_APIKey;
    if (!newsApiKey) {
      throw new Error('NEWS_API_KEY environment variable is not configured');
    }
    
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'weather OR climate',
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: '20',
        apiKey: newsApiKey
      }
    });

    // Return the news data
    res.status(200).json(response.data);
  } catch (error) {
    console.error('NewsAPI Error:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
}
