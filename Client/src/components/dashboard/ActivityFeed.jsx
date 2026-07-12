import React from 'react'
import { motion } from 'framer-motion'
import { FiMessageCircle, FiMap, FiUser, FiClock } from 'react-icons/fi'

const ActivityFeed = () => {
  const activities = [
    { id: 1, type: 'trip', message: 'New trip to Goa planned', time: '2 hours ago', icon: FiMap, color: 'from-blue-500 to-cyan-500' },
    { id: 2, type: 'chat', message: 'AI conversation about Manali', time: '5 hours ago', icon: FiMessageCircle, color: 'from-purple-500 to-pink-500' },
    { id: 3, type: 'profile', message: 'Profile updated', time: '1 day ago', icon: FiUser, color: 'from-green-500 to-emerald-500' },
  ]

  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 glass rounded-xl"
          >
            <div className={`w-8 h-8 bg-gradient-to-r ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <activity.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm">{activity.message}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                <FiClock size={10} />
                {activity.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ActivityFeed
