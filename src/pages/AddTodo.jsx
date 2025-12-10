import React, { useState } from "react";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleTodo = async (e) => {
    e.preventDefault();

    console.log({
      todo,
      completed,
    });

  };

  return (
    <div className="max-w-xl w-full mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
        Add New Task
      </h2>

      <form className="space-y-4">
        
        <input
          type="text"
          placeholder="Task title..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        
        <label className="flex items-center space-x-3 text-gray-700">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-5 w-5"
          />
          <span>Mark as Completed</span>
        </label>

        
        <button
          onClick={handleTodo}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
