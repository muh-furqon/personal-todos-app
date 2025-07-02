import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  return (
    <main className='grid min-h-screen bg-gray-900 place-items-center'>
      <div className='w-full max-w-md px-4 py-8 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-white'>Todo List</h1>
      </div>
    </main>
  )
}

export default App
