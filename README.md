# Tasklio - Task Management Application

Tasklio is a comprehensive task management application built with React. It allows users to organize their daily activities with features like task categorization, priority setting, and progress tracking, all with a user-friendly interface.

## Features

- User authentication and profile management
- Task creation, editing, and deletion
- Task categorization and priority levels
- Progress tracking and statistics
- Responsive design for all devices
- Step-by-step user registration with email authentication
- Filtering and sorting capabilities
- Clean, intuitive UI design

## Tech Stack

- React for the frontend
- Modern UI components and styling
- Secure authentication with Firebase
- Local storage for data persistence

## Project Structure

```
src/
├── components/     # React components
│   ├── Auth        # Authentication components
│   ├── LandingPage # Landing page components
│   ├── AboutPage   # About page components
│   └── application # Main task application components
├── contexts/       # React contexts for state management
├── firebase/       # Firebase configuration and auth functions
├── utils/          # Utility functions
├── styles/         # Global styles
└── assets/         # Static assets
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.