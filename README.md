# To-Do List with Categories

This is a simple To-Do List application built with React. It allows users to add tasks, assign categories, mark tasks as complete, and filter tasks by category.

## Features

- Add tasks with details and categories
- Mark tasks as complete
- Filter tasks by category
- Store tasks in localStorage for persistence

## Project Structure

```
todo-app
├── public
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Favicon for the application
├── src
│   ├── components          # React components
│   │   ├── App.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   ├── CategoryFilter.jsx
│   │   └── CategorySelector.jsx
│   ├── hooks               # Custom hooks
│   │   └── useTodos.js
│   ├── utils               # Utility functions
│   │   └── localStorage.js
│   ├── index.js            # Entry point for the React application
│   └── styles.css          # Styles for the application
├── package.json            # npm configuration file
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd todo-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```
This will launch the app in your default web browser.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is open-source and available under the MIT License.