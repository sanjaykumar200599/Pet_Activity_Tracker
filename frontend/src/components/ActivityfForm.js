import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { api } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {
  const [formData, setFormData] = useState({
    petName: '',
    activityType: '',
    duration: '',
    dateTime: new Date().toISOString().slice(0, 16)
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.petName.trim()) {
      newErrors.petName = 'Pet name is required';
    }
    if (!formData.activityType) {
      newErrors.activityType = 'Activity type is required';
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duration/quantity must be greater than 0';
    }
    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const result = await api.logActivity(formData);
      
      if (result.success) {
        // Reset form
        setFormData({
          petName: '',
          activityType: '',
          duration: '',
          dateTime: new Date().toISOString().slice(0, 16)
        });
        setErrors({});
        
        // Notify parent component
        if (onActivityAdded) {
          onActivityAdded();
        }
        
        // Show success message (optional)
        console.log('Activity logged successfully:', result.data);
      } else {
        alert(result.message || 'Error logging activity');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Clock className="mr-2 text-blue-500" size={20} />
        Log Activity
      </h2>
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Pet name"
            value={formData.petName}
            onChange={(e) => handleInputChange('petName', e.target.value)}
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.petName ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.petName && (
            <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.petName}</p>
          )}
        </div>

        <div>
          <select
            value={formData.activityType}
            onChange={(e) => handleInputChange('activityType', e.target.value)}
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.activityType ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select activity type</option>
            <option value="walk">🚶 Walk</option>
            <option value="meal">🍽️ Meal</option>
            <option value="medication">💊 Medication</option>
          </select>
          {errors.activityType && (
            <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.activityType}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder={formData.activityType === 'walk' ? 'Duration (minutes)' : 'Quantity'}
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            min="0"
            step="0.1"
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.duration ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.duration}</p>
          )}
        </div>

        <div>
          <input
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => handleInputChange('dateTime', e.target.value)}
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.dateTime ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.dateTime}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full p-3 rounded-xl font-semibold transition-all duration-200 shadow-md ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
          }`}
        >
          {isSubmitting ? 'Logging...' : 'Log Activity'}
        </button>
      </div>
    </div>
  );
};

export default ActivityForm;