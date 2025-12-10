import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateTodoMutation, useGetTodosQuery } from "../redux/api";

const UpdateTodo = () => {
  const { id } = useParams();
  const { data } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const navigate = useNavigate();

  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    if (data?.todos) {
      const todo = data.todos.find((t) => t.id === Number(id));
      if (todo) setTodoText(todo.todo);
    }
  }, [data, id]);

  const handleConfirm = async () => {
    try {
       const response = await updateTodo({ id, todo: todoText }).unwrap();
       console.log("Update Response:", response);
      navigate("/");
    } catch (err) {
      console.error("Failed to update todo", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-animate">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Todo
        </h2>
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Todo</label>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
