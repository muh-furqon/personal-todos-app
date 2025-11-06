import { useState } from "react";
import TodoDetailsPopup from "./TodoDetailsPopup";

export default function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Dynamic background based on completion status (Green for Done, Red for Pending)
    const itemBackgroundColor = todo.completed ? 'bg-green-800/70 hover:bg-green-700/70' : 'bg-red-800/70 hover:bg-red-700/70';
    const textStyles = todo.completed ? 'line-through text-gray-300 font-light' : 'text-white font-medium';

    return (
        <>
            <li
                // Cleaner margin/padding
                className={`flex items-center justify-between p-4 my-3 rounded-lg shadow-md transition-all duration-200 ${itemBackgroundColor} border border-gray-700`}
            >
                {/* 2. Separate Toggle Button (Checkbox style) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleTodo(todo.id); // 2. Separate button to change status
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        todo.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                >
                    {todo.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    )}
                </button>


                {/* 3. Main Content Area */}
                <div 
                    className="flex-grow min-w-0 px-4"
                >
                    <span className={`block text-lg truncate ${textStyles}`}>
                        {todo.title || todo.text}
                    </span>
                    {todo.description && (
                        <p className="text-sm text-gray-300/80 truncate mt-1">
                            {todo.description}
                        </p>
                    )}
                </div>

                {/* 3. Action Buttons */}
                <div className="flex items-center space-x-2">
                    {/* Details Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPopupOpen(true);
                        }}
                        className="p-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteTodo(todo.id);
                        }}
                        className="p-2 text-sm font-semibold text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </li>

            {isPopupOpen && (
                <TodoDetailsPopup
                    todo={todo}
                    onClose={() => setIsPopupOpen(false)} // Fixed prop name consistency
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo} // Pass the new update function
                />
            )}
        </>
    );
}