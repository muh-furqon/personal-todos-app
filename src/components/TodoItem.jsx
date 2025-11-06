import { useState } from "react";

import TodoDetailsPopup from "./TodoDetailsPopup";

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Dynamic background based on completion status (Green for Done, Red for Pending)
    const itemBackgroundColor = todo.completed ? 'bg-green-800/70 hover:bg-green-700/70' : 'bg-red-800/70 hover:bg-red-700/70';
    
    // Text styling for main task name
    const textStyles = todo.completed 
        ? 'line-through text-gray-300 font-light' 
        : 'text-white font-medium';

    return (
        <>
            <li
                // Enhanced li styling: rounded corners, shadow, slight hover effect, and dynamic background
                className={`flex items-center justify-between p-4 my-3 rounded-lg shadow-md transition-colors duration-200 ${itemBackgroundColor}`}
            >
                {/* 1. Main Content Area: Flex column to stack title and potential description preview */}
                <div 
                    className="flex-grow min-w-0 pr-4 cursor-pointer"
                    // Click the whole text area to toggle completion
                    onClick={() => toggleTodo(todo.id)}
                >
                    {/* Todo Title/Text */}
                    <span
                        className={`block text-lg truncate ${textStyles}`}
                    >
                        {todo.text}
                    </span>
                    
                    {/* Optional: Small description preview */}
                    {todo.description && (
                        <p className="text-sm text-gray-300/80 truncate mt-1">
                            {/* Display the first part of the description */}
                            {todo.description} 
                        </p>
                    )}
                </div>

                {/* 2. Action Buttons */}
                <div className="flex items-center space-x-2">
                    {/* Details Button (Blue) */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent toggling the todo when clicking 'Details'
                            setIsPopupOpen(true);
                        }}
                        className="p-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>

                    {/* Delete Button (Red) - Added X icon and fixed empty button content */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent toggling the todo when clicking 'Delete'
                            deleteTodo(todo.id);
                        }}
                        className="p-2 text-sm font-semibold text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </li>

            {/* Todo Details Popup */}
            {isPopupOpen && (
                <TodoDetailsPopup
                    todo={todo}
                    onClose={() => setIsPopupOpen(false)}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            )}
        </>
    );
}