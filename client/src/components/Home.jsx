import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.status === "ok") {
        toast.success(`Login successfully`);
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        setTimeout(() => {
          window.location.href = "./dashboard/dashboard";
        }, 2000);
      } else if (data.status === "notlogin") {
        toast.warning(`Login Failed`);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Login User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
