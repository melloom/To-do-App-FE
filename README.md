# Tasklio - Task Management Application

Tasklio is a comprehensive task management application built with React. It allows users to organize their daily activities with features like task categorization, priority setting, and progress tracking, all with a user-friendly interface.

## Features

- Step-by-step user registration with Google authentication
- Task creation and management with categories
- Priority levels and due dates for tasks
- Filtering and sorting capabilities
- User profile management
- Task completion tracking
- Clean, intuitive UI design

## Project Structure

```
tasklio
├── public
│   ├── index.html          # Main HTML file
│   └── tasklio-icon.ico    # App icon
├── src
│   ├── components          # React components
│   │   ├── Auth            # Authentication components
│   │   ├── LandingPage     # Landing page components
│   │   ├── AboutPage       # About page components
│   │   └── application     # Main task application components
│   ├── contexts            # React contexts for state management
│   ├── firebase            # Firebase configuration and auth functions
│   ├── hooks               # Custom React hooks
│   ├── utils               # Utility functions
│   ├── styles              # Global styles
│   ├── App.jsx             # Application main component
│   └── index.js            # Application entry point
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.