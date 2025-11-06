import { useLocalStorage } from './hooks/useLocalStorage'
import TodoForm from './components/ToDoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const [filter, setFilter] = useLocalStorage('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  })

  const addTodo = (newTodoData) => {
    const newTodo = {
      id: Date.now(),
      ...newTodoData,
      completed: false,
    };
    setTodos(currentTodos => [
      ...currentTodos,
      newTodo
    ]);
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
  return (
    <main className='grid min-h-screen bg-gray-900 place-items-center'>
      <div className='w-full max-w-md px-4 py-8 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-white'>Todo List</h1>
      </div>
      <TodoFilter setFilter={setFilter} currentFilter={filter} />
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={filteredTodos} 
        toggleTodo={toggleTodo} 
        // ⚠️ Check this typo: deletTodo should be deleteTodo
        deleteTodo={deleteTodo} 
      />
    </main>
  )
}

export default App
