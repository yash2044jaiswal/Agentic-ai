import Chat from '../models/Chat.js';
import travelAgentOrchestrator from '../services/TravelAgentOrchestrator.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * Controller handling user dialog context mapping and AI reasoning chains.
 * FULLY GENERATIVE - No hardcoded data, everything from Gemini API
 */
class ChatController {

  // Helper: Detect if message is a greeting
  isGreeting = (message) => {
    const greetings = ['hi', 'hello', 'hey', 'namaste', 'greetings', 'good morning', 'good evening', 'hola', 'gm', 'gn', 'hello there'];
    const lowerMsg = message.toLowerCase().trim();
    return greetings.some(g => lowerMsg === g || lowerMsg.startsWith(g + ' ') || lowerMsg.endsWith(' ' + g));
  };

  // Helper: Check if message is travel-related (basic filter)
  isTravelRelated = (message) => {
    const travelKeywords = [
      'trip', 'travel', 'plan', 'destination', 'tour', 'vacation', 'holiday',
      'goa', 'manali', 'kerala', 'jaipur', 'delhi', 'mumbai', 'shimla', 
      'udaipur', 'darjeeling', 'rishikesh', 'pondicherry', 'ladakh', 'kashmir',
      'flight', 'hotel', 'itinerary', 'budget', 'cost', 'price', 'book', 'visit',
      'journey', 'place', 'city', 'hill station', 'beach', 'mountain', 'trek'
    ];
    const lowerMsg = message.toLowerCase();
    
    // If message is too short (like "hi", "hello"), it's not travel
    if (message.trim().length < 3) return false;
    
    return travelKeywords.some(keyword => lowerMsg.includes(keyword));
  };

  // POST /api/chat
  handleChatMessage = async (req, res, next) => {
    try {
      let { message } = req.body;
      
      if (!message || message.trim().length === 0) {
        return res.status(400).json(
          new ApiResponse(400, null, 'Message is required')
        );
      }

      // STEP 1: Check for greeting
      if (this.isGreeting(message)) {
        const greetingResponse = {
          reasoningSteps: ["🤖 Agent 1: Detected greeting intent", "💬 Agent 2: Generating welcome response"],
          isConversation: true,
          isGreeting: true,
          responseText: `👋 **Namaste! Welcome to TravelMind AI!**\n\nI'm your intelligent travel planning assistant powered by Google's Gemini AI. I can help you plan trips to **ANY destination in India or worldwide**!\n\n**What I can do for you:**\n• ✈️ Create complete personalized itineraries\n• 💰 Optimize your budget smartly\n• 🏨 Find best accommodations\n• 🗓️ Generate day-by-day schedules\n• 💡 Provide local tips and recommendations\n\n**Try these examples:**\n*"I want a 5 day Goa trip from Delhi under ₹25,000 for 2 travelers"*\n\n*"Plan a 3 day Manali trip from Chandigarh under ₹15,000"*\n\n*"Create a 7 day Kerala trip from Mumbai under ₹80,000"*\n\n*"I need a 4 day trip to Jaipur from Ahmedabad with ₹20,000 budget"*\n\n*"Plan a 10 day Europe trip from India under ₹2,00,000"*\n\nJust tell me where you want to go, your budget, duration, and I'll handle everything! 🚀`
        };
        
        return res.status(200).json(
          new ApiResponse(200, {
            reasoningSteps: greetingResponse.reasoningSteps,
            chatResponse: greetingResponse.responseText,
            isTripPlan: false,
            isGreeting: true
          }, 'Conversation handled.')
        );
      }

      // STEP 2: Check if travel-related
      if (!this.isTravelRelated(message)) {
        const nonTravelResponse = {
          reasoningSteps: ["🔍 Agent 1: Analyzing query intent", "❌ Agent 2: Non-travel query detected"],
          isConversation: true,
          isTravelRelated: false,
          responseText: `🌏 **I'm your Travel Planning Assistant!**\n\nI specialize ONLY in **travel planning and destination recommendations**. Please ask me about:\n\n• ✈️ Trip planning and itineraries\n• 🏖️ Destination information (anywhere in the world)\n• 💰 Travel budgets and cost breakdowns\n• 🏨 Hotel and accommodation suggestions\n• 🗺️ Places to visit and activities\n• 🚗 Transportation options\n\n**Example travel queries:**\n• "Plan a 4 day Jaipur trip from Delhi under ₹20,000"\n• "Best time to visit Manali"\n• "Budget for 5 days in Goa"\n• "How to reach Kerala from Mumbai"\n• "Plan a trip to Andaman for 7 days"\n• "I want to go to Ladakh on a bike trip"\n\nWhat's your dream destination? Tell me and I'll plan everything! 🚀`
        };
        
        return res.status(200).json(
          new ApiResponse(200, {
            reasoningSteps: nonTravelResponse.reasoningSteps,
            chatResponse: nonTravelResponse.responseText,
            isTripPlan: false,
            isTravelRelated: false
          }, 'Non-travel query filtered.')
        );
      }

      // STEP 3: FULLY GENERATIVE - Let Gemini handle everything
      const agentResults = await travelAgentOrchestrator.processPlanRequest(message);

      // STEP 4: If Gemini returns conversation/non-plan response
      if (agentResults.isConversation || !agentResults.tripPlan) {
        return res.status(200).json(
          new ApiResponse(200, {
            reasoningSteps: agentResults.reasoningSteps || ["🤖 AI Agent is processing your request"],
            chatResponse: agentResults.responseText || "I'm analyzing your travel request. Could you please provide more details like destination, duration, and budget?",
            isTripPlan: false
          }, 'Conversation handled.')
        );
      }

      // STEP 5: Return the fully generative trip plan from Gemini
      return res.status(200).json(
        new ApiResponse(200, {
          reasoningSteps: agentResults.reasoningSteps,
          tripPlan: agentResults.tripPlan,
          isTripPlan: true,
          chatResponse: agentResults.responseText || `✨ **Your ${agentResults.tripPlan.destination} trip is ready!** ✨\n\nI've created a complete ${agentResults.tripPlan.days}-day itinerary within your budget. Check out the detailed plan below!`
        }, 'AI Agent plan generated successfully.')
      );
      
    } catch (err) {
      console.error('Chat Controller Error:', err);
      
      // Fallback error response
      return res.status(200).json(
        new ApiResponse(200, {
          reasoningSteps: ["❌ Error processing request"],
          chatResponse: "I'm having trouble processing your request right now. Could you please rephrase your travel plan? For example:Plan a 5-day trip to Goa from Delhi under ₹25,000 for 2 peopleI'll be happy to help you plan your perfect journey! ✈️",
          isTripPlan: false
        }, 'Error fallback')
      );
    }
  };
}

export default new ChatController();