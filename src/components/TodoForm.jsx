export default function TodoForm() {
    return (
        <form className="w-full max-w-lg" action="POST">
            <label htmlFor="task_name">Task Name</label>
            <input type="text" name="task_name" />

            <label htmlFor="task_date">Date</label>
            <input type="date" name="task_date" id="" />

            <label htmlFor="task_desc">Task Description</label>
            <input type="text" name="task_desc" id="" />

            <button type="submit">Create Task</button>
        </form>
    )
}