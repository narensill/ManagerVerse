import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebars/Sidebar.jsx";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db, { auth } from "../firebase.js";

const Manager = ({ darkMode, setDarkMode }) => {
  const ref = useRef();
  const passwordRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const savePassword = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const docRef = await addDoc(collection(db, "passwords"), {
        ...form,
        uid: user.uid, // Add UID to the document
      });
      const newPassword = { ...form, id: docRef.id };
      setPasswordArray([...passwordArray, newPassword]);
      setForm({ site: "", username: "", password: "" });
      //console.log("Password saved successfully with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving password:", error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await deleteDoc(doc(db, "passwords", id));
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      //console.log("Password deleted successfully with ID:", id);
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setForm(passwordToEdit);
      deletePassword(id);
    }
  };

  const noPass = () => {
    alert("Add passwords to show");
  };

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const passwordsQuery = query(
          collection(db, "passwords"),
          where("uid", "==", user.uid) // Fetch passwords only for this UID
        );
        const querySnapshot = await getDocs(passwordsQuery);
        const fetchedPasswords = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasswordArray(fetchedPasswords);
        //console.log("Passwords fetched successfully:", fetchedPasswords);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    fetchPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/eyec.png")) {
      ref.current.src = "/eyeo.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyec.png";
      passwordRef.current.type = "text";
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copied to clipboard:", text);
    });
  };

  const clearPasswords = async () => {
    try {
      for (let password of passwordArray) {
        await deleteDoc(doc(db, "passwords", password.id));
      }
      setPasswordArray([]);
      setForm({ site: "", username: "", password: "" });
      console.log("All passwords cleared successfully!");
    } catch (error) {
      console.error("Error clearing passwords:", error);
    }
  };

  return (
    <>
      <Sidebar />
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
          PASS
          <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
            <span className={darkMode ? "text-green-400" : "text-green-600"}>
              bot
            </span>
            /&gt;
          </span>
        </h1>

        <p className="text-center text-lg text-blue-700 animate-fadeIn ">
          Your Multitasking Password Manager
        </p>
        <div className="text-white flex flex-col fle p-4 gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Service Name"
            className={`rounded-lg gap-3 border border-sky-700  w-full p-4 py-1 ${
              darkMode ? "bg-transparent text-white" : "bg-white text-black"
            }`}
            type="text"
            name="site"
            id="a"
          />
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <input
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              className={`rounded-lg gap-3 border border-sky-700 w-full p-4 py-1 ${
                darkMode ? "bg-transparent text-white" : "bg-white text-black"
              }`}
              type="text"
              name="username"
              id="b"
            />
            <div className="relative w-full ">
              <input
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className={`rounded-lg gap-3 border border-sky-700 w-full p-4 py-1 ${
                  darkMode ? "bg-transparent text-white" : "bg-white text-black"
                }`}
                type="password"
                name="password"
                id="c"
                ref={passwordRef}
              />
              <span className="absolute right-3 top-2">
                <img
                  ref={ref}
                  style={{ width: "20px", height: "17px", cursor: "pointer" }}
                  src="/eyec.png"
                  alt="show"
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          {(!form.site || !form.username || !form.password) && (
            <div
              className={` text-sm mb-4 ${
                darkMode ? "text-red-700" : "text-red-500"
              }`}
            >
              All fields must be filled to add a password.
            </div>
          )}
          <button
            onClick={savePassword}
            disabled={!form.site || !form.username || !form.password}
            className={` flex justify-center items-center rounded-full px-4 py-2 w-fit transition-transform transform hover:scale-105 hover:drop-shadow-lg hover:font-bold ${
              darkMode
                ? "text-grey-400 bg-transparent border border-blue-600"
                : "text-black bg-sky-100 border border-blue-800 hover:bg-blue-200"
            }`}
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h1
            className={`font-bold text-2xl text-center py-3  ${
              darkMode ? "text-gray-300" : "text-blue-950"
            }`}
          >
            Your Passwords
          </h1>
          {passwordArray.length === 0 && (
            <div className="flex justify-center items-center hover:font-bold ">
              <div
                className="justify-center w-60 items-center text-center py-5 text-red-500 transition-transform transform hover:scale-105 hover:drop-shadow-lg text-md border border-red-400"
                onClick={noPass}
              >
                No Passwords to show
              </div>
            </div>
          )}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full border-collapse border border-sky-800">
              <thead
                className={
                  darkMode
                    ? "bg-sky-900 text-gray-400"
                    : "bg-sky-700 text-sky-950"
                }
              >
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody
                className={
                  darkMode ? "bg-transparent text-gray-300" : "bg-sky-100"
                }
              >
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                        }}
                      >
                        <span style={{ flex: 1, textAlign: "center" }}>
                          {item.site}
                        </span>
                        <img
                          src="paste.png"
                          className={`transition-transform transform hover:scale-110 hover:drop-shadow-lg ${
                            darkMode ? "invert" : ""
                          }`}
                          alt="paste"
                          onClick={() => copyText(item.site)}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                        }}
                      >
                        <span style={{ flex: 1, textAlign: "center" }}>
                          {item.username}
                        </span>
                        <img
                          className={`transition-transform transform hover:scale-110 hover:drop-shadow-lg ${
                            darkMode ? "invert" : ""
                          }`}
                          src="paste.png"
                          alt="paste"
                          onClick={() => copyText(item.username)}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                        }}
                      >
                        <span style={{ flex: 1, textAlign: "center" }}>
                          {item.password}
                        </span>
                        <img
                          className={`transition-transform transform hover:scale-110 hover:drop-shadow-lg ${
                            darkMode ? "invert" : ""
                          }`}
                          src="paste.png"
                          alt="paste"
                          onClick={() => copyText(item.password)}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
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
                          onClick={() => deletePassword(item.id)}
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
                          onClick={() => editPassword(item.id)}
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
          )}
          {passwordArray.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={clearPasswords}
                className={` flex justify-center items-center rounded-full px-4 py-2 w-fit  transition-transform transform hover:scale-105 hover:drop-shadow-lg border border-red-800 hover:font-bold ${
                  darkMode
                    ? "text-white bg-red-800 hover:bg-red-900"
                    : "text-black bg-red-100 hover:bg-red-200"
                }`}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/rypcsrlk.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#c71f16"
                ></lord-icon>
                Clear All Passwords
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
