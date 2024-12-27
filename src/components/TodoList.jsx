import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase.js";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), { task: todo });
      const newTodo = { task: todo, id: docRef.id };
      setTodoArray([...todoArray, newTodo]);
      setTodo("");
      console.log("To-Do added successfully with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding To-Do:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodoArray(todoArray.filter((item) => item.id !== id));
      console.log("To-Do deleted successfully with ID:", id);
    } catch (error) {
      console.error("Error deleting To-Do:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const fetchedTodos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodoArray(fetchedTodos);
        console.log("To-Dos fetched successfully:", fetchedTodos);
      } catch (error) {
        console.error("Error fetching To-Dos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="todo-container mt-5">
        <h1 className="text-4xl text-sky-900 font-bold text-center">
          <span className="text-blue-700">&lt;</span>TASK
          <span className="text-blue-700">
            <span className="text-green-600">bot</span>/&gt;
          </span>
        </h1>
        <div className="flex flex-col items-center px-5 p-4 gap-4">
          <input
            value={todo}
            onChange={handleChange}
            placeholder="Enter a new task"
            className="rounded-lg border border-sky-700 w-1/2 text-black p-4 py-1"
            type="text"
          />
          <button
            onClick={addTodo}
            disabled={!todo}
            className="text-black bg-sky-100 flex justify-center items-center rounded-full px-4 py-2 w-fit hover:bg-blue-200 transition-transform transform hover:scale-105 hover:drop-shadow-lg border border-blue-800 hover:font-bold"
          >
            Add Task
          </button>
        </div>
        <div className="tasks">
          <h2 className="font-bold text-2xl text-center py-3 text-blue-950">
            Your Tasks
          </h2>
          {todoArray.length === 0 && (
            <p className="text-center text-red-500">No tasks to show.</p>
          )}
          <ul className="list-disc pl-8">
            {todoArray.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2 px-4 border-b border-sky-200"
              >
                <span>{item.task}</span>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
