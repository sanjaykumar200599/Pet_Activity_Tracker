const express = require('express');
const router = express.Router();
const { validateActivity } = require('../middleware/validation');

// ✅ Get activities by pet name (placed BEFORE /:id and /)
router.get('/pet/:petName', (req, res) => {
  try {
    const { petName } = req.params;
    const petActivities = global.activities.filter(activity =>
      activity.petName.toLowerCase() === petName.toLowerCase()
    );

    res.json({
      success: true,
      data: petActivities,
      count: petActivities.length,
      petName
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pet activities',
      error: error.message
    });
  }
});

// ✅ Get all activities (with filters: date, petName, activityType)
router.get('/', (req, res) => {
  try {
    const { date, petName, activityType } = req.query;
    let filteredActivities = [...global.activities];

    if (date) {
      const filterDate = new Date(date).toDateString();
      filteredActivities = filteredActivities.filter(activity =>
        new Date(activity.dateTime).toDateString() === filterDate
      );
    }

    if (petName) {
      filteredActivities = filteredActivities.filter(activity =>
        activity.petName.toLowerCase().includes(petName.toLowerCase())
      );
    }

    if (activityType) {
      filteredActivities = filteredActivities.filter(activity =>
        activity.activityType === activityType
      );
    }

    res.json({
      success: true,
      data: filteredActivities,
      count: filteredActivities.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message
    });
  }
});

// ✅ Add new activity
router.post('/', validateActivity, (req, res) => {
  try {
    const { petName, activityType, duration, dateTime } = req.body;

    const newActivity = {
      id: Date.now(),
      petName: petName.trim(),
      activityType,
      duration: parseFloat(duration),
      dateTime,
      createdAt: new Date().toISOString()
    };

    global.activities.push(newActivity);

    res.status(201).json({
      success: true,
      message: 'Activity logged successfully',
      data: newActivity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging activity',
      error: error.message
    });
  }
});

// ✅ Delete activity by ID
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const activityIndex = global.activities.findIndex(activity => activity.id === parseInt(id));

    if (activityIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    const deletedActivity = global.activities.splice(activityIndex, 1)[0];

    res.json({
      success: true,
      message: 'Activity deleted successfully',
      data: deletedActivity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting activity',
      error: error.message
    });
  }
});

module.exports = router;
