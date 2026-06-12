import Trip from '../models/Trip.js';
import Chat from '../models/Chat.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * Controller to compile core analytical indicators for the dashboard views.
 */
class UserController {

  // GET /api/users/dashboard
  getDashboardStats = async (req, res, next) => {
    try {
      const userId = req.user._id;

      // Gather parallel analytical counts
      const [totalTrips, recentTrips, chatCount] = await Promise.all([
        Trip.countDocuments({ user: userId }),
        Trip.find({ user: userId }).sort({ createdAt: -1 }).limit(3),
        Chat.countDocuments({ user: userId })
      ]);

      // Calculate total spending recorded
      const budgetAccumulator = await Trip.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, totalSpent: { $sum: '$totalCost.total' } } }
      ]);

      const totalSpentCalculated = budgetAccumulator.length > 0 ? budgetAccumulator[0].totalSpent : 0;

      return res.status(200).json(
        new ApiResponse(200, {
          totalTrips,
          chatCount,
          totalInvestment: totalSpentCalculated,
          recentTrips
        }, 'Dashboard metrics loaded.')
      );
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();