import geminiService from './travelAgent.js';
import budgetPlanner from './budgetPlannerServices.js';
import itineraryGenerator from './ItineraryGeneratorService.js';
import geminiConfig from '../config/Gemini.js'

/**
 * Orchestrator class acting as the AI multi-agent director.
 * Coordinates specialised agents using Google Gemini as the knowledge base and planner.
 */
class TravelAgentOrchestrator {
  async processPlanRequest(queryText) {
    const reasoningSteps = [];
    const currentDate = new Date().toLocaleDateString('en-GB');

    // --- AGENT 1: LANGUAGE & REQUIREMENT ANALYZER (POWERED BY GEMINI) ---
    const userLanguage = this._detectLanguage(queryText);
    reasoningSteps.push(`Agent 1 [Analyzer]: Identified language: ${userLanguage}. Extracting global entities.`);
    
    // Dynamically extract requirements using Gemini API (if configured) or spelling-tolerant fallback
    const reqs = await this._extractRequirementsWithAI(queryText);
    console.log(`[Orchestrator] Dynamic Requirements Extracted:`, reqs);

    // --- AGENT 2: REAL-TIME KNOWLEDGE RETRIEVER ---
    reasoningSteps.push(`Agent 2 [Gemini Intelligence]: Fetching real-world ${currentDate} data for ${reqs.destination}.`);
    
    const searchContext = await geminiService.retrieveDestinationContext(
      reqs.source, 
      reqs.destination, 
      reqs.travelers, 
      reqs.days, 
      userLanguage
    );

    // --- AGENT 3: GLOBAL BUDGET PLANNER ---
    reasoningSteps.push("Agent 3 [Budget Planner]: Adjusting cost matrices for current currency exchange rates.");
    const budgetStructure = budgetPlanner.calculateAllocation(
      reqs.budget, 
      reqs.days, 
      reqs.travelers, 
      reqs.source, 
      reqs.destination
    );

    // --- AGENT 4: ITINERARY & REPORT GENERATOR ---
    reasoningSteps.push(`Agent 4 [Planner]: Designing day-wise experience in ${userLanguage}.`);
    const fullItinerary = itineraryGenerator.buildItinerary(
      reqs.days, 
      reqs.destination, 
      searchContext.attractions, 
      budgetStructure.transportCost
    );

    return {
      reasoningSteps,
      tripPlan: {
        ...reqs,
        itinerary: fullItinerary,
        costBreakdown: {
          transport: budgetStructure.transportCost,
          hotel: budgetStructure.hotelCost,
          food: budgetStructure.foodCost,
          activities: budgetStructure.activitiesCost,
          total: budgetStructure.totalCost
        },
        travelTips: searchContext.localTravelTips,
        emergencyContacts: searchContext.emergencyContacts,
        visaInfo: searchContext.visaRequired ? "Visa required for Citizens." : "Visa on arrival or not required.",
        aiInsight: searchContext.destinationDetails
      }
    };
  }

  _detectLanguage(text) {
    const hindiRegex = /[\u0900-\u097F]/;
    if (hindiRegex.test(text)) return "Hindi";
    return "English";
  }

  /**
   * Safe dynamic extractor utilizing Gemini for structured natural language understanding.
   */
  async _extractRequirementsWithAI(queryText) {
    if (geminiConfig.isConfigured()) {
      try {
        const client = geminiConfig.getClient();
        const model = client.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
          Extract travel planning parameters from this user search query: "${queryText}".
          Correct any spelling mistakes in destination names (e.g., "Singapur" to "Singapore", "goaa" to "Goa", "manaly" to "Manali").
          Format the output as a clean raw JSON object using this exact structure:
          {
            "source": "string (Detect starting city, default: Varanasi)",
            "destination": "string (Correct spelling mistakes, e.g. Singapore, Goa, Delhi, Manali, default: Goa)",
            "budget": number (Numeric value of budget, clean up commas like 80,000 to 80000, default: 25000),
            "days": number (Trip duration in days, default: 5),
            "travelers": number (Headcount of guests, default: 1)
          }
        `;

        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text().trim());
      } catch (err) {
        console.warn(`[AI Requirements Extraction Failed] Falling back to robust regex parser: ${err.message}`);
      }
    }
    return this._extractRequirementsRobustRegex(queryText);
  }

  /**
   * High-reliability fallback fuzzy spelling regex parser if Gemini key is unconfigured.
   */
  _extractRequirementsRobustRegex(query) {
    const cleanQuery = query.toLowerCase();
    
    let source = "Varanasi";
    let destination = "Goa";
    let budget = 25000;
    let days = 5;
    let travelers = 1;

    // Spelling error tolerant matching (Fuzzy regex)
    if (/singap[ouae]+r/i.test(cleanQuery) || /s[ngp]+[ou]r/i.test(cleanQuery)) {
      destination = "Singapore";
    } else if (/go+a/i.test(cleanQuery) || /g[ov]+a/i.test(cleanQuery)) {
      destination = "Goa";
    } else if (/man[ae]li/i.test(cleanQuery)) {
      destination = "Manali";
    } else if (/ker[ae]l[aa]/i.test(cleanQuery)) {
      destination = "Kerala";
    } else if (/par[ei]s/i.test(cleanQuery)) {
      destination = "Paris";
    }

    // Capture starting point
    const sourceMatch = query.match(/(?:from|starting in|source)\s+([A-Za-z]+)/i);
    if (sourceMatch) source = sourceMatch[1];

    // Robust budget extraction ignoring commas (e.g., ₹80,000 or 80k)
    const cleanedQueryNoCommas = cleanQuery.replace(/,/g, '');
    const kMatch = cleanedQueryNoCommas.match(/(\d+)\s*k/i);
    if (kMatch) {
      budget = parseInt(kMatch[1], 10) * 1000;
    } else {
      const budgetMatch = cleanedQueryNoCommas.match(/(\d{4,7})/);
      if (budgetMatch) budget = parseInt(budgetMatch[1], 10);
    }

    // Days extraction
    const dayMatch = cleanQuery.match(/(\d+)\s*day/i);
    if (dayMatch) days = parseInt(dayMatch[1], 10);

    // Travelers extraction
    const travelerMatch = cleanQuery.match(/(\d+)\s*(?:traveler|people|person|guest|friend)/i);
    if (travelerMatch) travelers = parseInt(travelerMatch[1], 10);

    return { source, destination, budget, days, travelers };
  }
}

export default new TravelAgentOrchestrator();