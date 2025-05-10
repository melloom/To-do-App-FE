import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/application/components/Header';
import Sidebar from './components/application/components/Sidebar';
import TodoList from './components/application/components/TodoList';
import TodoModal from './components/application/components/TodoModal';
import UserRegistration from './components/application/components/UserRegistration';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import { UserProvider, useUser } from './contexts/UserContext';

const AppContent = () => {
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
  const totalSteps = 5; // Total number of steps in creating a task

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
    // Only create the todo if we've reached the final step
    if (currentStep === totalSteps) {
      const newTodo = {
        ...todo,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      setTodos([...todos, newTodo]);

      // Show success message
      showSuccessAnimation();

      // Close modal after successful creation
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } else {
      // If not on the final step, just go to the next step
      nextStep();
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditingTodo(todoToEdit);
    setIsModalOpen(true);
  };

  const updateTodo = (updatedTodo) => {
    // Only update if on final step
    if (currentStep === totalSteps) {
      setTodos(todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ));
      setEditingTodo(null);

      // Show success message
      showSuccessAnimation();

      // Close modal after successful update
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } else {
      // If not on the final step, just go to the next step
      nextStep();
    }
  };

  const toggleTodoComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const newCompletedState = !todo.completed;
        return {
          ...todo,
          completed: newCompletedState,
          completedAt: newCompletedState ? new Date().toISOString() : null
        };
      }
      return todo;
    }));
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const showSuccessAnimation = () => {
    const successEl = document.createElement('div');
    successEl.className = 'success-animation';
    successEl.innerHTML = `
      <div class="success-icon">✓</div>
      <div class="success-message">Task ${editingTodo ? 'Updated' : 'Created'} Successfully!</div>
    `;

    document.body.appendChild(successEl);

    setTimeout(() => {
      successEl.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(successEl);
      }, 500);
    }, 1500);
  };

  const openNewTaskModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  // Guide text for each step
  const stepGuides = [
    "Let's start by giving your task a name",
    "Now, choose a category for your task",
    "Set the priority and due date",
    "Add any notes or subtasks",
    "Review and create your task"
  ];

  const AppLayout = () => (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="app-main-wrapper">
        <Header onAddTaskClick={openNewTaskModal} />

        <main className="app-main">
          {isModalOpen && stepByStepMode && (
            <div className="step-indicator-container">
              <div className="step-guide-text">
                <h3>Step {currentStep} of {totalSteps}</h3>
                <p>{stepGuides[currentStep - 1]}</p>
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
          onClose={() => {
            setIsModalOpen(false);
            setEditingTodo(null);
          }}
          addTodo={editingTodo ? updateTodo : addTodo}
          editingTodo={editingTodo}
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          stepByStepMode={stepByStepMode}
        />
      </div>
    </div>
  );

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/app" element={<AppLayout />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="*"
            element={
              !user && !showRegistration ? (
                <LandingPage />
              ) : showRegistration ? (
                <UserRegistration />
              ) : (
                <AppLayout />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
