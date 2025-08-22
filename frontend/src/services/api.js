const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

export const api = {
  // Get all activities
  getActivities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  },

  // Log new activity
  logActivity: async (activityData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging activity:', error);
      return { success: false, message: 'Network error' };
    }
  },

  // Delete activity
  deleteActivity: async (activityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting activity:', error);
      return { success: false, message: 'Network error' };
    }
  },

  // Get today's summary
  getSummary: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/summary`);
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error fetching summary:', error);
      return null;
    }
  },

  // Get summary for specific date
  getSummaryByDate: async (date) => {
    try {
      const response = await fetch(`${API_BASE_URL}/summary/${date}`);
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error fetching summary by date:', error);
      return null;
    }
  },

  // Get chat history
  getChatHistory: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/history`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  },

  // Send chat message
  sendMessage: async (message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, message: 'Network error' };
    }
  },

  // Clear chat history
  clearChatHistory: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/history`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error clearing chat history:', error);
      return { success: false, message: 'Network error' };
    }
  },

  // Get activities by pet name
  getActivitiesByPet: async (petName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/pet/${petName}`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching pet activities:', error);
      return [];
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      return { status: 'Error', message: 'API not responding' };
    }
  }
};