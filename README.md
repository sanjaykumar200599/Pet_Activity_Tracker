# Pet Activity Tracker - Full Stack Application

A comprehensive pet activity tracking application built with React frontend and Node.js backend for internship project submission.

## 🚀 Features

✅ **Activity Logging**: Track walks, meals, and medications with validation  
✅ **Daily Summary**: Visual progress rings with smooth animations  
✅ **AI Chatbot**: Context-aware pet activity assistant with chat history  
✅ **Walk Reminders**: Automatic notifications at 6 PM if no walks logged  
✅ **Mobile-First Design**: Responsive UI optimized for mobile devices  
✅ **Real-time Validation**: Instant form feedback with error handling  
✅ **RESTful API**: Complete backend with proper error handling and middleware  
✅ **Component Architecture**: Well-structured React components with separation of concerns  

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, CORS middleware
- **Storage**: In-memory arrays/objects (as per requirements)
- **API**: RESTful endpoints with full CRUD operations
- **Development**: Concurrently for running both servers, Nodemon for auto-restart

## 📁 Project Structure

```
pet-activity-tracker/
├── package.json                 # Root package with scripts to run both servers
├── .gitignore                   # Comprehensive gitignore for Node.js and React
├── README.md                    # This file
├── backend/                     # Node.js/Express backend
│   ├── server.js               # Main server file with middleware setup
│   ├── package.json            # Backend dependencies
│   ├── routes/
│   │   ├── activities.js       # Activity CRUD operations
│   │   ├── chat.js            # Chat functionality
│   │   └── summary.js         # Daily summary calculations
│   ├── middleware/
│   │   └── validation.js      # Input validation middleware
│   └── utils/
│       └── aiResponse.js      # AI response generation logic
└── frontend/                   # React frontend
    ├── package.json           # Frontend dependencies
    ├── public/
    │   └── index.html         # HTML template with Tailwind CSS
    └── src/
        ├── App.js             # Main app component
        ├── App.css            # Custom styles and animations
        ├── index.js           # React app entry point
        ├── components/
        │   ├── ActivityForm.js    ← Activity logging form
        │   ├── Summary.js         ← Daily summary display
        │   ├── Chatbot.js         ← AI chatbot interface
        │   └── ProgressRing.js    ← Animated progress rings
        └── services/
            └── api.js             ← API service layer.js # Activity logging form
        │   ├── Summary.js     # Daily summary display
        │   ├── Chatbot.js     # AI chatbot interface
        │   └── ProgressRing.js # Animated progress indicators
        └── services/
            └── api.js         # API service layer for backend communication
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd pet-activity-tracker
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Available Scripts

```bash
# Development (runs both servers)
npm run dev

# Install all dependencies
npm run install-all

# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Log new activity
- `DELETE /api/activities/:id` - Delete activity
- `GET /api/activities/pet/:petName` - Get activities by pet name

### Summary
- `GET /api/summary` - Get today's summary
- `GET /api/summary/:date` - Get summary for specific date

### Chat
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/message` - Send message and get AI response
- `DELETE /api/chat/history` - Clear chat history

### Utility
- `GET /api/health` - API health check

## 🎯 Key Features Explained

### 1. Activity Logging
- Form validation with real-time feedback
- Support for walks (duration in minutes), meals, and medications
- Date/time picker with default current time
- Error handling and user feedback

### 2. Daily Summary
- Animated progress rings showing completion percentage
- Walk time, meal count, and medication count
- Visual indicators with color-coded progress
- Responsive design for mobile devices

### 3. AI Chatbot
- Context-aware responses based on pet's actual data
- Chat history persistence during session
- Typing indicators and smooth animations
- Keyword-based intelligent responses about activities

### 4. Walk Reminders
- Automatic check at 6 PM for missing walks
- Dismissible reminder notifications
- Context-aware messaging with pet names

## 🔧 Development Features

- **Hot Reload**: Both frontend and backend auto-restart on changes
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Validation**: Server-side validation with detailed error responses
- **CORS**: Properly configured for cross-origin requests
- **Component Structure**: Modular React components with clear separation
- **API Abstraction**: Clean API service layer for backend communication

## 🚀 Production Deployment

The app is configured for production deployment:

```bash
# Build frontend
npm run build

# Start production server
npm start
```

The backend serves the built React app in production mode.

## 🎨 Design Principles

- **Mobile-First**: Responsive design optimized for mobile devices
- **Accessibility**: Proper color contrast and semantic HTML
- **User Experience**: Smooth animations and instant feedback
- **Performance**: Optimized API calls and efficient state management
- **Clean Code**: Well-structured components with meaningful names

## 🧪 Testing Your Setup

1. **Navigate to http://localhost:3000**
2. **Log activities** for your pet using different types
3. **Check the summary** updates with animated progress rings
4. **Test the AI chatbot** by asking about today's activities
5. **Verify API health** at http://localhost:3001/api/health

## 📝 Assignment Completion Checklist

✅ **Pet Activity Logging**: Complete with validation  
✅ **Daily Summary**: Visual progress rings with animations  
✅ **AI Chatbot**: Context-aware with chat history  
✅ **Walk Reminders**: 6 PM notification system  
✅ **Mobile-First Design**: Responsive and accessible  
✅ **RESTful API**: Full backend with proper structure  
✅ **In-Memory Storage**: No database as per requirements  
✅ **Error Handling**: Comprehensive validation and feedback  
✅ **Clean Architecture**: Well-organized code structure  
✅ **Documentation**: Complete setup and usage instructions  

## 👨‍💻 Development Notes

- The AI chatbot uses rule-based responses (no external API required)
- All data is stored in memory as per assignment requirements
- The app demonstrates full-stack development skills
- Code is production-ready with proper error handling
- Architecture allows for easy extension and maintenance

## 🚀 Future Enhancements

- Integration with Google Gemini API for advanced AI responses
- Database integration (PostgreSQL/MongoDB)
- User authentication and multi-pet support
- Push notifications for mobile app
- Data visualization charts and analytics
- Export functionality for activity reports

---
