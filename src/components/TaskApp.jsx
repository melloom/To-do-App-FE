import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';
import ConfirmationModal from './common/ConfirmationModal';

const TaskApp = () => {
  const { user, showRegistration } = useUser();
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [stepByStepMode, setStepByStepMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [activePage, setActivePage] = useState('home');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const totalSteps = 5;

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Reset steps when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      setCurrentStep(1);
    }
  }, [isModalOpen]);

  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    // Instead of deleting directly, open confirmation dialog
    setPendingAction(() => () => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
    setShowConfirmation(true);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditingTodo(todoToEdit);
    setIsModalOpen(true);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    ));
  };

  const toggleTodoComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompletedTodos = () => {
    // Show confirmation before clearing completed tasks
    setPendingAction(() => () => {
      setTodos(todos.filter(todo => !todo.completed));
    });
    setShowConfirmation(true);
  };

  const openNewTaskModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const closeModalWithConfirmation = () => {
    // If we're in the middle of filling out a form, show confirmation first
    if (currentStep > 1) {
      setPendingAction(() => () => {
        setIsModalOpen(false);
      });
      setShowConfirmation(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmAction = () => {
    // Execute the pending action if it exists
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setShowConfirmation(false);
  };

  // If user registration is showing, render it
  if (showRegistration) {
    return <div>User Registration Component</div>;
  }

  // If user is not logged in, redirect to landing page
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app-placeholder">
      <div className="placeholder-message">
        <h2>Application Access Disabled</h2>
        <p>Access to the application has been temporarily disabled.</p>
        <p>This is a demo mode where you can complete the registration process without accessing the application.</p>
        <p>Your registration information has been saved successfully.</p>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to proceed with this action?"
          onConfirm={handleConfirmAction}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default TaskApp;