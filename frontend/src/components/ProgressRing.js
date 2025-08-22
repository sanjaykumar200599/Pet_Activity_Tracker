import React from 'react';

const ProgressRing = ({ value, max, label, unit, color }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 96 96">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Value display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700">{value}</span>
        </div>

        {/* Percentage indicator */}
        {percentage > 0 && (
          <div className="absolute -top-2 -right-2">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
              style={{ backgroundColor: color }}
            >
              {Math.round(percentage)}%
            </div>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mt-2 text-center font-medium">
        {label}
        {unit && ` (${unit})`}
      </p>

      {/* Progress bar underneath */}
      <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
        <div
          className="h-1 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

export default ProgressRing;