const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const activitiesRoutes = require('./routes/activities');
const chatRoutes = require('./routes/chat');
const summaryRoutes = require('./routes/summary');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (shared across routes)
global.activities = [];
global.chatHistory = [
  { 
    id: 1, 
    sender: 'bot', 
    text: 'Hi! I\'m here to help you track your pet\'s activities. How can I assist you today?',
    timestamp: new Date().toISOString()
  }
];

// Routes
app.use('/api/activities', activitiesRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/summary', summaryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Pet Activity Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🐾 Pet Activity Tracker API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
