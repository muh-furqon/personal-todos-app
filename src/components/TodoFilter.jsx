export default function TodoFilter({ setFilter, currentFilter }) {
    const filters = [
        { name: 'All', value: 'all' },
        { name: 'Completed', value: 'completed' },
        { name: 'Incomplete', value: 'incomplete' },

    ]

    return (
        <div className="flex justify-center my-4 space-x-3 p-2 bg-gray-700 rounded-md">
            {filters.map((f) => (
                <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 
                        ${currentFilter === f.value 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`
                    }
                >
                    {f.name}
                </button>
            ))}
        </div>
    )
}