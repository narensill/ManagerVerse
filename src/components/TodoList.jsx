import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase.js";
import Clock from "./stylers/Clock.jsx";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [time, setTime] = useState("");
  const [todoArray, setTodoArray] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const addTodo = async () => {
    if (!time) {
      alert("Please select a time for the task.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        task: todo,
        time,
      });
      const newTodo = { task: todo, time, id: docRef.id };
      setTodoArray(
        [...todoArray, newTodo].sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        )
      );
      setTodo("");
      setTime("");
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

  const clearAllTodos = async () => {
    try {
      const deletePromises = todoArray.map((item) =>
        deleteDoc(doc(db, "todos", item.id))
      );
      await Promise.all(deletePromises);
      setTodoArray([]);
      console.log("All To-Dos cleared successfully.");
    } catch (error) {
      console.error("Error clearing all To-Dos:", error);
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todoArray.find((item) => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.task);
      setTime(todoToEdit.time);
      deleteTodo(id);
    }
  };
  const noTask = () => {
    alert("Add Tasks to show");
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const fetchedTodos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodoArray(
          fetchedTodos.sort((a, b) => new Date(a.time) - new Date(b.time))
        );
        console.log("To-Dos fetched successfully:", fetchedTodos);
      } catch (error) {
        console.error("Error fetching To-Dos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <Clock />
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
          <input
            value={time}
            onChange={handleTimeChange}
            type="datetime-local"
            className="rounded-lg border border-sky-700 w-1/2 text-black p-4 py-1"
          />
          <button
            onClick={addTodo}
            disabled={!todo || !time}
            className="text-black bg-sky-100 flex justify-center items-center rounded-full px-4 py-2 w-fit hover:bg-blue-200 transition-transform transform hover:scale-105 hover:drop-shadow-lg border border-blue-800 hover:font-bold"
          >
            Add Task
          </button>
        </div>
        <div className="tasks">
          <h2 className="font-bold text-2xl text-center py-3 text-blue-950">
            Your Tasks
          </h2>
          {todoArray.length === 0 ? (
            <div className="flex justify-center items-center hover:font-bold ">
              <div
                className="justify-center w-60 items-center text-center py-5 text-red-500 transition-transform transform hover:scale-105 hover:drop-shadow-lg text-md border border-red-400"
                onClick={noTask}
              >
                No Task to show
              </div>
            </div>
          ) : (
            <>
              <table className="table-auto w-3/4 text-center border-collapse border border-sky-500 mx-auto mt-4">
                <thead className="bg-sky-700 text-sky-950">
                  <tr>
                    <th className="border border-sky-500 px-4 py-2">Task</th>
                    <th className="border border-sky-500 px-4 py-2">
                      Scheduled Time
                    </th>
                    <th className="border border-sky-500 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-sky-100">
                  {todoArray.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-sky-500 px-4 py-2">
                        {item.task}
                      </td>
                      <td className="border border-sky-500 px-4 py-2">
                        {new Date(item.time).toLocaleString()}
                      </td>
                      <td className="border border-sky-500 px-4 py-2">
                        <button
                          onClick={() => editTodo(item.id)}
                          className="bg-yellow-400 text-white px-2 py-1 rounded-lg mr-2 hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                <button
                  onClick={clearAllTodos}
                  className="text-black bg-red-100 flex justify-center items-center rounded-full px-4 py-2 w-fit hover:bg-red-200 transition-transform transform hover:scale-105 hover:drop-shadow-lg border border-red-800 hover:font-bold"
                >
                  Clear All
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;
