import { useState } from "react"

export default function TodoForm({addTodo}) {
    // We only need state for Title and Description
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation handled in App.jsx, but keep local trim check
        if (todoTitle.trim() === '') return; 
        
        addTodo({
            text: todoTitle.trim(), // Primary text field for TodoItem display
            title: todoTitle.trim(), // Used for editing/popup title
            description: todoDescription.trim(),
        });
        
        // Clear inputs
        setTodoTitle('');
        setTodoDescription('');
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* 1. Title Input */}
            <div> 
                <label htmlFor="todo-title" className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
                <input 
                    id="todo-title"
                    type="text"
                    className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g., Finish project report"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
            </div>

            {/* 2. Description Textarea (Huge Input Field) */}
            <div>
                <label htmlFor="todo-description" className="block text-sm font-medium text-gray-400 mb-1">Details/Description</label>
                <textarea 
                    id="todo-description"
                    rows="6" // 🌟 Makes the input visibly large/huge
                    className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Add detailed notes or requirements..."
                    value={todoDescription}
                    onChange={(e) => setTodoDescription(e.target.value)}
                ></textarea>
            </div>
            
            {/* 3. Submit Button */}
            <div className="flex justify-end">
                <button 
                    type="submit" 
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                >
                    Add Task
                </button>
            </div>
        </form>
    )
}