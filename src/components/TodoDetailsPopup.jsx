export default function TodoDetailsPopup({ todo, onClose, toggleTodo, deleteTodo }) {
    // ⚠️ Typo fix: Renamed prop 'closePopup' to 'onClose' for consistency, but the call below is correct now.
    
    const statusColor = todo.completed? 'text-green-400' : 'text-red-400';
    const statusText = todo.completed? 'Completed' : 'Incomplete';
    
    // Dynamic action button class based on completion status
    const actionButtonClass = todo.completed 
        ? 'bg-yellow-600 hover:bg-yellow-700' // Change Mark Incomplete button to Yellow
        : 'bg-green-600 hover:bg-green-700'; // Mark Complete is Green

    return (
        // Overlay: Fixed inset-0 and correctly using {onClose}
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-85 backdrop-blur-sm" 
            onClick={onClose}
        >
            <div 
                // Modal Content: Increased shadow, border for contrast
                className="w-full max-w-lg p-8 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-700 mb-6">
                    <h2 className={`text-3xl font-extrabold text-white`}>
                        {todo.title || todo.text}
                    </h2>
                    {/* Close Button: Corrected case to {onClose} */}
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors duration-150 p-1 rounded-full text-2xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Status */}
                <p className="text-lg mb-6">
                    <span className="font-semibold text-gray-400 mr-2">Status:</span>
                    <span className={`text-xl font-bold ${statusColor}`}>{statusText}</span>
                </p>

                {/* Description Box */}
                <div className="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <h3 className="text-base font-medium uppercase tracking-wider text-gray-300 mb-2">Description:</h3>
                    <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">{todo.description || 'No description provided.'}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => {
                            toggleTodo(todo.id);
                            onClose();
                        }}
                        // Dynamic styling for the toggle button
                        className={`px-5 py-2 font-semibold text-white rounded-lg transition-colors duration-150 ${actionButtonClass}`}
                    >
                        {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>

                    <button
                        onClick={() => {
                            deleteTodo(todo.id);
                            onClose();
                        }}
                        className="px-5 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors duration-150"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}