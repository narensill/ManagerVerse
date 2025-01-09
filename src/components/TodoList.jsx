import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase.js";
import Clock from "./Sidebars/Clock.jsx";

const TodoList = ({ darkMode, setDarkMode }) => {
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
      <div
        className={`fixed inset-0 -z-10 h-full w-full transition-all duration-300 ease-in-out ${
          darkMode
            ? "bg-slate-950"
            : "bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]"
        }`}
        style={{ height: "100vh", backgroundAttachment: "fixed" }}
      >
        <div
          className={`fixed inset-0 transition-all duration-300 ease-in-out ${
            darkMode
              ? "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
              : "bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"
          }`}
          style={{ backgroundAttachment: "fixed" }}
        ></div>
      </div>

      <div className="md:mycontainer">
        <h1
          className={`text-4xl font-bold text-center animate-fadeInDown ${
            darkMode ? "text-gray-300" : "text-sky-900"
          }`}
        >
          <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
            &lt;
          </span>
          TASK
          <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
            <span className={darkMode ? "text-green-400" : "text-green-600"}>
              bot
            </span>
            /&gt;
          </span>
        </h1>
        <p className="text-center text-lg text-blue-700 mb-6 animate-fadeIn">
          Track your tasks efficiently!!
        </p>
        <div className="flex flex-col items-center px-5 p-4 gap-4">

          <input
            value={todo}
            onChange={handleChange}
            placeholder="Enter a new task"
            className={`rounded-lg border border-sky-700 w-1/2 p-4 py-1  ${
              darkMode ? "bg-transparent text-white" : "bg-white text-black"
            }`}
            type="text"
          />
          <input
            value={time}
            onChange={handleTimeChange}
            type="datetime-local"
            className={`rounded-lg border border-sky-700 w-1/2 p-4 py-1  ${
              darkMode ? "bg-transparent text-white" : "bg-white text-black"
            }`}
          />
          <button
            onClick={addTodo}
            disabled={!todo || !time}
            className={` flex justify-center items-center rounded-full px-4 py-2 w-fit transition-transform transform hover:scale-105 hover:drop-shadow-lg hover:font-bold ${
              darkMode
                ? "text-white bg-transparent border border-blue-600"
                : "text-black bg-sky-100 border border-blue-800 hover:bg-blue-200"
            }`}
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
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
              <table className="table-auto w-3/4 text-center border-collapse border border-sky-800 mx-auto mt-4">
                <thead
                  className={
                    darkMode
                      ? "bg-sky-900 text-gray-400"
                      : "bg-sky-700 text-sky-950"
                  }
                >
                  <tr>
                    <th className=" px-4 py-2">Task</th>
                    <th className="+px-4 py-2">Scheduled Time</th>
                    <th className=" px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody
                  className={
                    darkMode ? "bg-transparent text-gray-300" : "bg-sky-100"
                  }
                >
                  {todoArray.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-sky-500 px-4 py-2">
                        {item.task}
                      </td>
                      <td className="border border-sky-500 px-4 py-2">
                        {new Date(item.time).toLocaleString()}
                      </td>
                      <td className="border border-sky-500 px-4 py-2">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0 10px",
                          }}
                        >
                          <img
                            className={`transition-transform transform hover:scale-110 hover:drop-shadow-lg ${
                              darkMode ? "invert" : ""
                            }`}
                            src="trash.png"
                            alt="trash"
                            onClick={() => deleteTodo(item.id)}
                            style={{
                              cursor: "pointer",
                              width: "22px",
                              height: "22px",
                              margin: "10px",
                            }}
                          />
                          <img
                            className={`transition-transform transform hover:scale-110 hover:drop-shadow-lg ${
                              darkMode ? "invert" : ""
                            }`}
                            src="edit.png"
                            alt="edit"
                            onClick={() => editTodo(item.id)}
                            style={{
                              cursor: "pointer",
                              width: "22px",
                              height: "22px",
                            }}
                          />
                        </div>
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
