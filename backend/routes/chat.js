const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../utils/aiResponse');

// Get chat history
router.get('/history', (req, res) => {
  try {
    res.json({
      success: true,
      data: global.chatHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching chat history',
      error: error.message
    });
  }
});

// Send message and get AI response
router.post('/message', (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Add user message to history
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message.trim(),
      timestamp: new Date().toISOString()
    };

    global.chatHistory.push(userMessage);

    // Generate AI response
    const aiResponse = generateAIResponse(message, global.activities, global.chatHistory);

    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: aiResponse,
      timestamp: new Date().toISOString()
    };

    global.chatHistory.push(botMessage);

    res.json({
      success: true,
      data: {
        userMessage,
        botMessage
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing chat message',
      error: error.message
    });
  }
});

// Clear chat history
router.delete('/history', (req, res) => {
  try {
    global.chatHistory = [
      { 
        id: 1, 
        sender: 'bot', 
        text: 'Hi! I\'m here to help you track your pet\'s activities. How can I assist you today?',
        timestamp: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      message: 'Chat history cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing chat history',
      error: error.message
    });
  }
});

module.exports = router;