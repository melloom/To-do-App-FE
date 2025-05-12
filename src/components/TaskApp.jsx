import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';
import Header from './application/components/Header';
import Sidebar from './application/components/Sidebar';
import TodoList from './application/components/TodoList';
import TodoModal from './application/components/TodoModal';
import UserRegistration from './application/components/UserRegistration';
import ConfirmationModal from './common/ConfirmationModal';
import './application/styles/index.css';

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
    return <UserRegistration />;
  }

  // If user is not logged in, redirect to landing page
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="app-main-wrapper">
        <Header onAddTaskClick={openNewTaskModal} />

        <main className="app-main">
          {isModalOpen && stepByStepMode && (
            <div className="step-indicator-container">
              <div className="step-guide-text">
                <h3>Step {currentStep} of {totalSteps}</h3>
                <p>{getStepGuide(currentStep)}</p>
              </div>
              <div className="step-indicators">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`step-dot ${index + 1 === currentStep ? 'active' : ''}
                               ${index + 1 < currentStep ? 'completed' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}

          <TodoList
            todos={todos}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onToggleComplete={toggleTodoComplete}
            onEdit={editTodo}
            onDelete={deleteTodo}
            onClearCompleted={clearCompletedTodos}
            onAddNewTask={openNewTaskModal}
          />
        </main>

        <TodoModal
          isOpen={isModalOpen}
          onClose={closeModalWithConfirmation}
          addTodo={editingTodo ? updateTodo : addTodo}
          editingTodo={editingTodo}
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          stepByStepMode={stepByStepMode}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmAction}
          title="Are you sure?"
          message={
            <>
              <p>This action cannot be undone.</p>
              <p>Are you sure you want to continue?</p>
            </>
          }
          confirmText="Yes, Continue"
          cancelText="No, Cancel"
          confirmButtonClass="confirm-danger"
          icon={<span role="img" aria-label="warning">⚠️</span>}
        />
      </div>
    </div>
  );
};

// Helper function to get step guide text
const getStepGuide = (step) => {
  const guides = [
    "Let's start by giving your task a name",
    "Now, choose a category for your task",
    "Set the priority and due date",
    "Add any notes or subtasks",
    "Review and create your task"
  ];

  return guides[step - 1] || "";
};

export default TaskApp;