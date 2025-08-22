const validateActivity = (req, res, next) => {
  const { petName, activityType, duration, dateTime } = req.body;

  // Validation errors array
  const errors = [];

  // Pet name validation
  if (!petName || !petName.trim()) {
    errors.push('Pet name is required');
  }

  // Activity type validation
  if (!activityType || !['walk', 'meal', 'medication'].includes(activityType)) {
    errors.push('Valid activity type is required (walk, meal, medication)');
  }

  // Duration validation
  if (!duration || duration <= 0) {
    errors.push('Duration/quantity must be greater than 0');
  }

  // Date time validation
  if (!dateTime) {
    errors.push('Date and time are required');
  } else if (isNaN(Date.parse(dateTime))) {
    errors.push('Valid date and time format is required');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // If validation passes, continue to next middleware
  next();
};

const validateMessage = (req, res, next) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Message is required and cannot be empty'
    });
  }

  if (message.trim().length > 1000) {
    return res.status(400).json({
      success: false,
      message: 'Message is too long (maximum 1000 characters)'
    });
  }

  next();
};

module.exports = {
  validateActivity,
  validateMessage
};
