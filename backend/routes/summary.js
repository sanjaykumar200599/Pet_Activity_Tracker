const express = require('express');
const router = express.Router();

// Get today's summary
router.get('/', (req, res) => {
  try {
    const today = new Date().toDateString();
    const todaysActivities = global.activities.filter(activity => 
      new Date(activity.dateTime).toDateString() === today
    );

    const summary = {
      walks: todaysActivities.filter(a => a.activityType === 'walk').reduce((sum, a) => sum + a.duration, 0),
      meals: todaysActivities.filter(a => a.activityType === 'meal').length,
      medications: todaysActivities.filter(a => a.activityType === 'medication').length,
      totalActivities: todaysActivities.length
    };

    // Check if walk reminder needed (after 6 PM with no walks)
    const now = new Date();
    const currentHour = now.getHours();
    const needsWalkReminder = currentHour >= 18 && summary.walks === 0;

    res.json({
      success: true,
      data: {
        ...summary,
        needsWalkReminder,
        date: today
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message
    });
  }
});

// Get summary for specific date
router.get('/:date', (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date).toDateString();
    const dateActivities = global.activities.filter(activity => 
      new Date(activity.dateTime).toDateString() === targetDate
    );

    const summary = {
      walks: dateActivities.filter(a => a.activityType === 'walk').reduce((sum, a) => sum + a.duration, 0),
      meals: dateActivities.filter(a => a.activityType === 'meal').length,
      medications: dateActivities.filter(a => a.activityType === 'medication').length,
      totalActivities: dateActivities.length,
      date: targetDate
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching summary for date',
      error: error.message
    });
  }
});

module.exports = router;
