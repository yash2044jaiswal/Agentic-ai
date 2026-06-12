/**
 * Calculates travel budgets, categorizes expenses, and constructs alternatives.
 */
class BudgetPlannerService {
  /**
   * Plans budget allocation across travel categories.
   * @param {number} budget - Overall budget limit
   * @param {number} days - Duration
   * @param {number} travelers - Headcount
   * @param {string} source - Start location
   * @param {string} destination - Goal location
   * @returns {Object} Structured budget allocation
   */
  calculateAllocation(budget, days, travelers, source, destination) {
    console.log(`[Budget Agent Active] Allocating values for a ₹${budget} budget over ${days} days...`);

    // Budget Multipliers based on traveler count and duration
    // Standard transport calculation (Rough estimate based on distance/mode)
    let singlePersonTransport = 3500; // Train sleeper or budget bus seat
    
    if (budget > 50000) {
      singlePersonTransport = 12000; // Flight seat typical pricing
    } else if (budget > 35000) {
      singlePersonTransport = 7500; // Low-tier flight or AC train
    }

    const totalEstimatedTransport = singlePersonTransport * travelers;

    // Base cost calculations
    const remainingBudget = budget - totalEstimatedTransport;
    const dailyAllocationPool = remainingBudget / days;

    // Distribute daily allocation
    let hotelCostDaily = dailyAllocationPool * 0.45;
    let foodCostDaily = dailyAllocationPool * 0.35;
    let activitiesCostDaily = dailyAllocationPool * 0.20;

    // Minimum boundary protection
    if (hotelCostDaily < 800 * travelers) hotelCostDaily = 800 * travelers;
    if (foodCostDaily < 400 * travelers) foodCostDaily = 400 * travelers;
    if (activitiesCostDaily < 200 * travelers) activitiesCostDaily = 200 * travelers;

    // Sum details
    const finalHotelTotal = Math.round(hotelCostDaily * days);
    const finalFoodTotal = Math.round(foodCostDaily * days);
    const finalActivitiesTotal = Math.round(activitiesCostDaily * days);
    const finalTransportTotal = Math.round(totalEstimatedTransport);

    const calculatedSum = finalHotelTotal + finalFoodTotal + finalActivitiesTotal + finalTransportTotal;

    return {
      transportCost: finalTransportTotal,
      hotelCost: finalHotelTotal,
      foodCost: finalFoodTotal,
      activitiesCost: finalActivitiesTotal,
      totalCost: calculatedSum,
      isWithinBudget: calculatedSum <= budget,
      marginRemaining: budget - calculatedSum
    };
  }
}

export default new BudgetPlannerService();