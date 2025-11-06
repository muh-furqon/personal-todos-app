import { useState } from "react"

export default function TodoFilter({ setFilter, currentFilter, setSortOrder, currentSortOrder }) {
    const [date, setDate] = useState('');

    const statusFilters = [
        { name: 'All', value: 'all' },
        { name: 'Done', value: 'completed' },
        { name: 'Pending', value: 'incomplete' },

    ]

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);

        setFilter(newDate || 'all');
    }

    return (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg shadow-inner">
            <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">Filter & Sort</h3>

            {/* Status Filters */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">Status:</span>
                <div className="flex space-x-2">
                    {statusFilters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => {
                                setFilter(f.value);
                                setDate(''); // Clear date filter when a status filter is selected
                            }}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                                currentFilter === f.value ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            }`}
                        >
                            {f.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort Order and Date Search */}
            <div className="flex justify-between items-center space-x-4">
                {/* Sort Order Dropdown */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Order:</span>
                    <select
                        value={currentSortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="p-1 text-sm bg-gray-600 text-white rounded focus:ring-blue-500"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
                
                {/* Date Filter Input */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Date:</span>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="p-1 text-sm bg-gray-600 text-white rounded focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}