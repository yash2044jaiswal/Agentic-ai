import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Configuration module for Google Gemini AI.
 * Initializes the generative AI client and handles verification fallback.
 */
class GeminiConfig {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.client = null;

    if (this.isConfigured()) {
      // Corrected initialization using official SDK parameters
      this.client = new GoogleGenerativeAI(this.apiKey);
    }
  }

  isConfigured() {
    return (
      this.apiKey && 
      this.apiKey !== 'your_google_gemini_api_key_here' && 
      this.apiKey.trim() !== ''
    );
  }

  getClient() {
    return this.client;
  }
}

export default new GeminiConfig();