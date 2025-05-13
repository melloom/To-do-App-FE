# Tasklio - Task Management Application

Tasklio is a comprehensive task management application built with React and Supabase. It allows users to organize their daily activities with features like task categorization, priority setting, and progress tracking, all with a user-friendly interface.

## Features

- Step-by-step user registration with email authentication
- Task creation and management with categories
- Priority levels and due dates for tasks
- Filtering and sorting capabilities
- User profile management
- Task completion tracking
- Clean, intuitive UI design
- Supabase backend for authentication, database, and storage

## Backend

Tasklio uses Supabase for its backend services:
- **Authentication**: Email/password login, user management
- **Database**: PostgreSQL for storing user data and tasks
- **Storage**: File uploads for profile pictures and task attachments
- **Security**: Row Level Security to protect user data

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
│   ├── supabase            # Supabase configuration and auth functions
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
3. Set up environment variables (see below)
4. Start the development server: `npm start`

## Environment Setup

Create a `.env` file in the project root with the following variables:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Migration

This project has been migrated from Firebase to Supabase. For detailed information about the migration process, see:

- [MIGRATION.md](/MIGRATION.md) - Complete migration guide
- [/supabase/migration-summary.md](/supabase/migration-summary.md) - Migration summary
- [/src/supabase/README.md](/src/supabase/README.md) - Supabase implementation details

To test the Supabase implementation:

```bash
./test-supabase.sh
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.