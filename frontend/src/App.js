import React, { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import Summary from './components/Summary';
import Chatbot from './components/Chatbot';
import { MapPin } from 'lucide-react';
import { api } from './services/api';
import './App.css';

const App = () => {
  const [activities, setActivities] = useState([]);
  const [showReminder, setShowReminder] = useState(false);
  const [summary, setSummary] = useState({ walks: 0, meals: 0, medications: 0 });

  // Load initial data
  useEffect(() => {
    loadActivities();
    loadSummary();
    
    // Check for walk reminder periodically
    const interval = setInterval(loadSummary, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const loadActivities = async () => {
    const data = await api.getActivities();
    setActivities(data);
  };

  const loadSummary = async () => {
    const summaryData = await api.getSummary();
    if (summaryData) {
      setSummary(summaryData);
      setShowReminder(summaryData.needsWalkReminder);
    }
  };

  const handleActivityAdded = () => {
    loadActivities();
    loadSummary();
    setShowReminder(false);
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">🐾 Pet Tracker</h1>
        <p className="text-center text-blue-100 mt-1">Keep your furry friend healthy</p>
      </div>

      {/* Walk Reminder */}
      {showReminder && (
        <div className="mx-4 mt-4 bg-orange-100 border-l-4 border-orange-400 p-4 rounded-r-lg animate-pulse">
          <div className="flex items-center">
            <MapPin className="text-orange-600 mr-2" size={20} />
            <p className="text-orange-800 font-medium">
              Your pet still needs exercise today!
            </p>
          </div>
          <button 
            onClick={() => setShowReminder(false)}
            className="text-orange-600 text-sm underline mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="p-6">
        {/* Activity Form */}
        <ActivityForm onActivityAdded={handleActivityAdded} />
        
        {/* Today's Summary */}
        <Summary summary={summary} />
      </div>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default App;