import { useState } from "react";

export default function TodoDetailsPopup({ todo, onClose, toggleTodo, deleteTodo, updateTodo }) {
    const [title, setTitle] = useState(todo.title || todo.text);
    const [description, setDescription] = useState(todo.description || '');
    const [isEditing, setIsEditing] = useState(false);
    
    const statusColor = todo.completed? 'text-green-400' : 'text-red-400';
    const statusText = todo.completed? 'Completed' : 'Incomplete';
    
    // Dynamic action button class based on completion status
    const handleSave  = () => {
        if (title.trim() === '') {
            alert('Title cannot be empty.');
            return;
        }

        updateTodo(todo.id, { title: title.trim(), description: description.trim(), text: title.trim() });
        setIsEditing(false);
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-85 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="w-full max-w-lg p-8 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-700 mb-6">
                    {isEditing ? (
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-3xl font-extrabold bg-gray-700 text-white rounded p-1 w-full mr-4 focus:ring-blue-500 focus:border-blue-500"
                            aria-label="Edit Title"
                        />
                    ) : (
                        <h2 className={`text-3xl font-extrabold text-white`}>{title}</h2>
                    )}
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 text-2xl">&times;</button>
                </div>

                {/* Status & Date */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-lg">
                        <span className="font-semibold text-gray-400 mr-2">Status:</span>
                        <span className={`text-xl font-bold ${statusColor}`}>{statusText}</span>
                    </p>
                    <p className="text-sm text-gray-500">Created: {todo.createdDate || 'N/A'}</p>
                </div>

                {/* Description Box */}
                <div className="mb-8">
                    <h3 className="text-base font-medium uppercase tracking-wider text-gray-300 mb-2">Description:</h3>
                    {isEditing ? (
                         <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg h-32 resize-none focus:ring-blue-500 focus:border-blue-500"
                            aria-label="Edit Description"
                        />
                    ) : (
                        <p className="text-gray-100 p-4 bg-gray-800 rounded-lg whitespace-pre-wrap leading-relaxed">
                            {description || 'No description provided.'}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between space-x-3">
                    {/* Toggle Button */}
                    <button
                        onClick={() => {
                            toggleTodo(todo.id);
                            onClose();
                        }}
                        className={`px-4 py-2 font-semibold text-white rounded-lg transition-colors ${todo.completed ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>

                    <div className="flex space-x-3">
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={() => {
                                deleteTodo(todo.id);
                                onClose();
                            }}
                            className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}