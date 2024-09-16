import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACKEND_API_URL}/api/auth/register`,
      //   { username, email, password }
      // );
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/OverviewPage");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(
        err.response.data.msg || "An error occurred during registration"
      );
    }
  };

  return (
    <div className=" w-1/4 rounded-2xl mt-8 mx-auto bg-gray-200 relative p-6 border-2 border-gray-300 transition-all ease-out duration-500 overflow-visible">
    {/* <div className=" bg-slate-400 h-2/3 mt-8 mx-16 backdrop-blur-sm bg-opacity-50"> */}
      
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="my-5">
          <span className="mx-2 my-[10px]"> Already have an account</span>
          <a href="/login">
            <span className="mx-2 mt-8 text-blue-700">click here</span>
          </a>
          </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-green-600"
      >
        Register
      </button>
    </form>
    </div>
  );
};

export default Registration;
