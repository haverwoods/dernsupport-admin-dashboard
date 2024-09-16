import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('/api/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      // navigate('/OverviewPage');
      const response = await axios.post('http://localhost:5000/api/auth/login', {email, password });
      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/OverviewPage");
    } catch (err) {
      setError(err.response.data.msg || 'An error occurred during login');
    }
  };

  return (

    <div className=" w-1/4 rounded-2xl mt-8 mx-auto bg-gray-200 relative p-6 border-2 border-gray-300 transition-all ease-out duration-500 overflow-visible">
      
    <div className="flex-1  overflow-auto relative z-10">
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email:</label>
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
        <label htmlFor="password" className="block mb-2">Password:</label>
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
          <span className="ml-1 "> create a new account</span>
          <a href="/registration">
            <span className="mx-2 mt-8 text-blue-700">click here</span>
          </a>
          </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-green-600">
        Login
      </button>
    </form>
    </div>
      </div>
  );
};

export default Login;