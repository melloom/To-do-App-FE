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
  
  return {
    todos: filteredTodos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery
  };
};

export default useTodos;
