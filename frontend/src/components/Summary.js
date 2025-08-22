import React from 'react';
import ProgressRing from './ProgressRing';

const Summary = ({ summary }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Today's Summary</h2>
      
      <div className="flex justify-around items-center">
        <ProgressRing 
          value={summary.walks} 
          max={60} 
          label="Walk Time" 
          unit="min" 
          color="#3b82f6" 
        />
        <ProgressRing 
          value={summary.meals} 
          max={3} 
          label="Meals" 
          unit="" 
          color="#10b981" 
        />
        <ProgressRing 
          value={summary.medications} 
          max={2} 
          label="Medications" 
          unit="" 
          color="#f59e0b" 
        />
      </div>

      {/* Additional summary info */}
      <div className="mt-4 text-center text-gray-600">
        <p className="text-sm">
          Total activities logged: <span className="font-semibold">{summary.totalActivities || 0}</span>
        </p>
        {summary.date && (
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {new Date(summary.date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Summary;