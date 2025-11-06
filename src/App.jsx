import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage'
import TodoForm from './components/ToDoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

const getTodayDate = () => new Date().toISOString().split('T')[0];

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // ... (addTodo, updateTodo, toggleTodo, deleteTodo functions remain the same) ...
  const addTodo = (newTodoData) => {
    const isDuplicate = todos.some(
      (todo) => todo.title.toLowerCase() === newTodoData.title.toLowerCase()
    )

    if (newTodoData.title.trim() === '') {
      alert('Todo title cannot be empty.');
      return;
    }
    
    if (isDuplicate) {
      alert('A todo with this title already exists.');
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      ...newTodoData,
      completed: false,
      createdDate: getTodayDate(),
    };

    setTodos(currentTodos => [
      newTodo,
      ...currentTodos,
    ]);
  }

  const updateTodo = (id, updates) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, ...updates } : todo
      )
    )
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id ))
  }

  const processedTodos = useMemo(() => {
    let list = [...todos];

    list = list.filter((todo) => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'incomplete') return !todo.completed;
      
      if (filter.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return todo.createdDate === filter;
      }
      
      return true;
    })

    list.sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    })

    return list;
  }, [todos, filter, sortOrder])

  return (
    <main className='min-h-screen bg-gray-900 flex justify-center py-10'>
      <div className='w-full max-w-6xl px-4'>
        <h1 className='text-4xl font-extrabold text-center text-white mb-8'>Pro Task Manager</h1>

        <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
          
          {/* 1. LEFT COLUMN: ADD FORM (Now correctly wrapped) */}
          <div className='md:col-span-2 p-6 bg-gray-800 rounded-xl shadow-2xl'>
            <h2 className='text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3'>
              ➕ Create New Task
            </h2>
            {/* 🌟 CORRECTION: TodoForm is now inside the sidebar's styled div */}
            <TodoForm addTodo={addTodo} />
          </div>

          {/* 2. RIGHT COLUMN: FILTER & LIST */}
          <div className='md:col-span-3'>
            
            {/* Filter and Sort */}
            <div className='mb-4'>
                <TodoFilter 
                    setFilter={setFilter} 
                    currentFilter={filter} 
                    setSortOrder={setSortOrder} 
                    currentSortOrder={sortOrder} 
                />
            </div>
            
            {/* List Container */}
            <div className='p-6 bg-gray-800 rounded-xl shadow-2xl h-[calc(100vh-250px)] overflow-y-auto'>
                <h2 className='text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-3'>
                    📋 Task List ({processedTodos.length})
                </h2>
                <TodoList 
                    todos={processedTodos} 
                    toggleTodo={toggleTodo} 
                    deleteTodo={deleteTodo} 
                    updateTodo={updateTodo}
                />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;