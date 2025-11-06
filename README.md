# 🚀 Pro Task Manager
A professional, feature-rich to-do list application built with **React** and styled using **Tailwind CSS**. This application offers full CRUD (Create, Read, Update, Delete) functionality with advanced filtering, sorting, and persistent state management via Local Storage.

# 🌟 Key Features
The Pro Task Manager offers robust functionality designed for efficient task management:

- **Full CRUD**: Easily Create, Read details, Update (Edit/Toggle), and Delete tasks.

- **Persistent State**: Task data is automatically saved to the browser's Local Storage using a custom hook (useLocalStorage.js), ensuring your to-dos remain even after closing the browser.

- **Responsive Two-Column Layout**: Features a clean desktop layout with the Add Task Form on the left and the Task List and Filters on the right for optimal workflow.

- **Advanced Filtering & Sorting**:

  - **Filter by Status**: Show all, completed, or incomplete tasks.

  - **Filter by Date**: Search for tasks created on a specific day.

  - **Sort by Date**: Order tasks from newest to oldest (default) or oldest to newest.

- **Detailed Task Management**:

  - **Inline Status Toggle**: Dedicated button on the list item to mark tasks as complete/incomplete.

  - **Details Popup**: Click the "Details" button to open a modal that allows editing the title/description and viewing the creation date.

- **Input Validation**: Prevents adding tasks with empty titles and alerts users if they attempt to create a task with a duplicate title.

---
# 💻 Project Structure
The application is structured using a standard React setup for clarity and maintainability.

```
.
├── components/
│   ├── TodoDetailsPopup.jsx    # Modal for viewing/editing task details
│   ├── TodoFilter.jsx          # UI for sorting and filtering controls
│   ├── TodoForm.jsx            # Form for adding new tasks (Title & Description)
│   ├── TodoItem.jsx            # Renders individual list items and opens the popup
│   └── TodoList.jsx            # Maps over the filtered list and renders TodoItems
├── hooks/
│   └── useLocalStorage.js      # Custom React Hook for state persistence
├── utils/
│   └── storage.js              # Helper functions to interact with window.localStorage
└── App.jsx                     # Main component, handles state, CRUD logic, filtering, and layout
```

# 📂 Custom Hook & Utilities Explanation

`hooks/useLocalStorage.js` <br><br>
This custom hook is responsible for persistent state management.

Functionality | Description
--- | ---
**Initial Value Retrieval** | On first load, it checks Local Storage for the key (`'todos'`). If data exists, it uses it; otherwise, it uses the `initialValue` (`[]`).
**Side Effect Synchronization** | Uses `useEffect` to automatically call `set(key, value)` every time the `value` (the `todos` array) changes, saving the latest state to Local Storage.


`utils/storage.js` <br><br>
Simple utility wrapper for browser's `localStorage` API.

Function | Description
--- | ---
`get(key)` | Retrieves the item from Local Storage and attempts to parse it using `JSON.parse()`. Includes a `try...catch` block for basic error handling, returning the raw string if parsing fails.
`set(key, value)` | Stores the value in Local Storage after serializing it into a JSON string using `JSON.stringify()`.

---
# ⚙️ Setup and Installation
**Prerequisites** <br><br>
You need **Node.js** and **npm** (or Yarn/pnpm) installed on your machine.

**Installation Steps** <br>
1. **Clone the repository:**
```bash
git clone [https://github.com/muh-furqon/personal-todos-app.git]
```
2. **Install Dependencies:**
```bash
npm install
# or yarn install
```
3. **Run the Application:**
```bash
npm run dev
# or yarn dev
```

The application will start, usually accessible at `http://localhost:5173`.

