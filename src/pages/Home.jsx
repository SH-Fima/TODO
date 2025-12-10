import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useGetTodosQuery, useDeleteTodoMutation } from '../redux/api';
import { useNavigate } from "react-router-dom";
import AddTodo from './AddTodo';

const Home = () => {
  const { auth } = useAuth();
  const { data, isLoading, isError, error } = useGetTodosQuery(auth.id);
  const [todos, setTodos] = useState([]);
  const [deleteTodo] = useDeleteTodoMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.todos) {
      setTodos(data.todos);
    }
  }, [data]);

  // if (isLoading) return <p className="text-center mt-10 text-white">Loading...</p>;


  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap();
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg text-center">
        Your Todo List
      </h1>

   
      <AddTodo />

   
      <div className="w-full max-w-lg mt-10 space-y-4">
        {todos.length === 0 ? (
          <p className="text-white text-center text-lg">No todos found!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="w-5 h-5 accent-purple-500"
                />
                <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800 font-medium"}>
                  {todo.todo}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/update/${todo.id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
