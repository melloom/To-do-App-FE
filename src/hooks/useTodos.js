import { useState, useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = getFromLocalStorage('todos') || [];
    setTodos(savedTodos);
  }, []);
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage('todos', todos);
  }, [todos]);
  
  // Apply filtering when todos, filter, or search changes
  useEffect(() => {
    let result = [...todos];
    
    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(todo => todo.category === filter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(query) || 
        (todo.description && todo.description.toLowerCase().includes(query))
      );
    }
    
    setFilteredTodos(result);
  }, [todos, filter, searchQuery]);
  
  const addTodo = (newTodo) => {
    setTodos(prevTodos => [
      ...prevTodos, 
      { 
        ...newTodo, 
        id: Date.now(), 
        createdAt: new Date().toISOString(), 
        completed: false 
      }
    ]);
  };
  
  const toggleComplete = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  const editTodo = (updatedTodo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  // Add search functionality
  const searchTodos = (query) => {
    if (!query.trim()) return filteredTodos;
    
    const lowerQuery = query.toLowerCase();
    return filteredTodos.filter(todo => 
      todo.title.toLowerCase().includes(lowerQuery) ||
      (todo.description && todo.description.toLowerCase().includes(lowerQuery)) ||
      (todo.category && todo.category.toLowerCase().includes(lowerQuery)) ||
      (todo.tags && todo.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  };

  const getFilteredTodos = (filterType) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (filterType) {
      case 'inbox':
        return todos.filter(todo => !todo.completed && !todo.dueDate);
      case 'today':
        return todos.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        });
      case 'upcoming':
        return todos.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          return dueDate > today;
        });
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'overdue':
        return todos.filter(todo => {
          if (!todo.dueDate || todo.completed) return false;
          const dueDate = new Date(todo.dueDate);
          return dueDate < today;
        });
      case 'priority-high':
        return todos.filter(todo => todo.priority === 'high' && !todo.completed);
      case 'priority-medium':
        return todos.filter(todo => todo.priority === 'medium' && !todo.completed);
      case 'priority-low':
        return todos.filter(todo => todo.priority === 'low' && !todo.completed);
      default:
        return filteredTodos;
    }
  };

  const getTodosByLabel = (label) => {
    return todos.filter(todo => 
      todo.labels && todo.labels.includes(label)
    );
  };

  return {
    todos: filteredTodos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    searchTodos,
    getFilteredTodos,
    getTodosByLabel
  };
};

export default useTodos;
