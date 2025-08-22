const getTodaysSummary = (activities) => {
  const today = new Date().toDateString();
  const todaysActivities = activities.filter(activity => 
    new Date(activity.dateTime).toDateString() === today
  );

  return {
    walks: todaysActivities.filter(a => a.activityType === 'walk').reduce((sum, a) => sum + a.duration, 0),
    meals: todaysActivities.filter(a => a.activityType === 'meal').length,
    medications: todaysActivities.filter(a => a.activityType === 'medication').length,
    totalActivities: todaysActivities.length
  };
};

const generateAIResponse = (message, activities, chatHistory) => {
  const lowerMessage = message.toLowerCase();
  const summary = getTodaysSummary(activities);
  
  // Context-aware responses based on message content
  if (lowerMessage.includes('walk') || lowerMessage.includes('exercise')) {
    let response = `Your pet has walked ${summary.walks} minutes today. `;
    
    if (summary.walks === 0) {
      response += 'Time for a walk! Regular exercise is important for your pet\'s health and happiness.';
    } else if (summary.walks < 30) {
      response += 'Consider adding more walks for better health! Most dogs need 30-60 minutes of daily exercise.';
    } else if (summary.walks > 60) {
      response += 'Wow! Your pet is very active today! Make sure they have plenty of water and rest.';
    } else {
      response += 'Great job on keeping them active! This is a good amount of daily exercise.';
    }
    
    return response;
    
  } else if (lowerMessage.includes('meal') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    let response = `Your pet has had ${summary.meals} meals today. `;
    
    if (summary.meals === 0) {
      response += 'Don\'t forget to feed your pet! Regular feeding times help maintain their health.';
    } else if (summary.meals < 2) {
      response += 'Make sure they\'re eating enough throughout the day! Most pets need 2-3 meals daily.';
    } else if (summary.meals > 3) {
      response += 'That\'s quite a few meals! Make sure portions are appropriate for your pet\'s size and age.';
    } else {
      response += 'Good feeding schedule! Consistency in meal times helps with digestion.';
    }
    
    return response;
    
  } else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('med')) {
    let response = `Your pet has had ${summary.medications} medications today. `;
    
    if (summary.medications === 0) {
      response += 'If your pet needs medication, don\'t forget to administer it as prescribed by your vet.';
    } else {
      response += 'Always follow your vet\'s instructions and never skip doses! Consistent medication helps your pet stay healthy.';
    }
    
    return response;
    
  } else if (lowerMessage.includes('summary') || lowerMessage.includes('today') || lowerMessage.includes('status')) {
    return `Today's summary: ${summary.walks} minutes of walking, ${summary.meals} meals, and ${summary.medications} medications. Total activities logged: ${summary.totalActivities}. ${
      summary.totalActivities === 0 ? 'Start logging some activities to track your pet\'s day!' : 'Keep up the good work caring for your pet!'
    }`;
    
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
    return 'I can help you track your pet\'s activities! Ask me about walks, meals, medications, or request today\'s summary. I remember our conversation and your pet\'s activity patterns. Try asking: "How many walks today?" or "Show me today\'s summary"';
    
  } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return 'You\'re welcome! I\'m here to help you keep track of your pet\'s health and activities. Feel free to ask me anything about your pet\'s daily routine!';
    
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm your pet activity assistant. ${summary.totalActivities > 0 ? `I see you've logged ${summary.totalActivities} activities today.` : 'Ready to start tracking your pet\'s activities?'} How can I help you today?`;
    
  } else {
    // Default response with context
    let response = 'I understand you\'re asking about your pet\'s activities. ';
    
    if (summary.totalActivities > 0) {
      response += `So far today: ${summary.walks} minutes of walking, ${summary.meals} meals, and ${summary.medications} medications. `;
    }
    
    response += 'Feel free to ask me about walks, meals, medications, or request today\'s summary. I\'m here to help you keep track of your pet\'s daily activities!';
    
    return response;
  }
};

module.exports = {
  generateAIResponse,
  getTodaysSummary
};