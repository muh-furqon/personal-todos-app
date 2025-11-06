// TodoList.jsx
import TodoItem from './TodoItem';
export default function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }) { // 🌟 RECEIVE updateTodo
    return (
        <ul className="mt-4">
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    toggleTodo={toggleTodo} 
                    deleteTodo={deleteTodo} 
                    updateTodo={updateTodo} // 🌟 PASS updateTodo
                />
            ))}
        </ul>
    )
}