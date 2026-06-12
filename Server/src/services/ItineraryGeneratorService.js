/**
 * Dynamic itinerary creation engine for building customized day-by-day actions.
 */
class ItineraryGeneratorService {
  /**
   * Outputs customizable day-wise planner arrays.
   */
  buildItinerary(days, destination, attractions, transportCost) {
    console.log(`[Itinerary Agent Active] Formatting ${days}-day plan for ${destination}`);

    const baseItinerary = [];
    const attractionsPool = attractions && attractions.length ? attractions : ["Local Bazaar", "Scenic Viewpoint", "Historical Museum"];

    for (let day = 1; day <= days; day++) {
      let title = "";
      const activities = [];
      let accommodation = `Standard Budget Homestay in central ${destination}`;
      let tips = "Prefer utilizing local public transit buses or shared cabs to save costs.";

      if (day === 1) {
        title = `Arrival and Settling in ${destination}`;
        activities.push(`Arrive in ${destination}, complete check-in procedures, and rest.`);
        activities.push(`Spend a relaxed evening at ${attractionsPool[0] || 'Local City Square'}.`);
        activities.push(`Try popular local delicacies at a nearby traditional restaurant.`);
        tips = "Coordinate with your host about reliable local scooter rentals or transit routes.";
      } else if (day === days) {
        title = `Departure Prep and Souvenir Shopping`;
        activities.push(`Savor breakfast and complete hotel check-out formalities.`);
        activities.push(`Visit local shopping markets for souvenirs, crafts, and native treats.`);
        activities.push(`Transfer safely to the station/airport for your return journey home.`);
        tips = "Double check your ticket guidelines and baggage allowance before departure.";
      } else {
        // Core sightseeing days
        const attractionIndex1 = (day - 1) % attractionsPool.length;
        const attractionIndex2 = day % attractionsPool.length;

        title = `Exploring Highlights of ${destination}`;
        activities.push(`Morning tour of the iconic ${attractionsPool[attractionIndex1]}.`);
        activities.push(`Break for lunch followed by regional walking tours.`);
        activities.push(`Head to ${attractionsPool[attractionIndex2]} during golden sunset hours.`);
        tips = "Bring along valid IDs and pre-book entrance tickets where applicable.";
      }

      baseItinerary.push({
        day,
        title,
        activities,
        meals: {
          breakfast: "Included at your place of stay",
          lunch: "Local street food exploration",
          dinner: "Authentic diner recommendation"
        },
        accommodation,
        travelDetails: "Utilize local auto-rickshaws, shared taxis, or rental scooters.",
        tips
      });
    }

    return baseItinerary;
  }
}

export default new ItineraryGeneratorService();