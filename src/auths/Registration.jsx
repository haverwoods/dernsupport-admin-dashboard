import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("personal");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Make the registration request
  //     const response = await axios.post(
  //       "http://localhost:5000/api/auth/register",
  //       {
  //         username,
  //         email,
  //         password,
  //         accountType
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json" // Changed from multipart/form-data since we're sending JSON
  //         }
  //       }
  //     );
      
  //     console.log("Registration successful:", response.data);
  //     localStorage.setItem("token", response.data.token);
  //     navigate("/repairreq");
      
  //   //   // Check if the server returned a token
  //   // if (response.data.token) {
  //   //   // Store the token in localStorage
  //   //   localStorage.setItem("token", response.data.token);

  //   //   // Decode the token to get user details
  //   //   const getToken = localStorage.getItem("token");
  //   //   const decodedToken = jwtDecode(getToken);

  //   //   // Determine if the user is an admin
  //   //   const isAdmin = decodedToken.role?.[0]?.name === "admin";
  //   //     // Navigate based on role
  //   //     if (isAdmin) {
  //   //       navigate("/overviewpage");
  //   //     } else {
  //   //       navigate("/repairreq");
  //   //     }
  //   //   } else {
  //   //     throw new Error('Registration failed');
  //   //   }
  //     } catch (err) {
  //       console.error("Registration error:", err);
  //       setError(
  //         err.response?.data?.message || "An error occurred during registration"
  //       );
  //     }
  // };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        accountType,
      });
  
      console.log("Registration successful:", response.data);
  
      // Store token in localStorage if provided
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("there is token")
      
  
        // Decode token to check role
        const decoded = jwtDecode(response.data.token);
        const isAdmin = decoded?.role?.[0]?.name === "admin";
  
        // Navigate based on role
        if (isAdmin) {
          navigate("/overviewpage");
        } else {
          navigate("/repairreq");
        }
      } else {
        throw new Error("Token missing in registration response");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "An error occurred during registration");
    }
  };
  
  return (
    <div className="w-1/4 rounded-2xl mt-8 mx-auto bg-gray-200 relative p-6 border-2 border-gray-300 transition-all ease-out duration-500 overflow-visible">
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
          <label className="block mb-2">Account Type:</label>
          <div>
            <label className="mr-2">
              <input
                type="radio"
                name="accountType"
                value="personal"
                checked={accountType === "personal"}
                onChange={(e) => setAccountType(e.target.value)}
                className="mr-2"
              />
              Personal Account
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="business"
                checked={accountType === "business"}
                onChange={(e) => setAccountType(e.target.value)}
                className="mr-2"
              />
              Business Account
            </label>
          </div>
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
          <span className="mx-2 my-[10px]">Already have an account</span>
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
