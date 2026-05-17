import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        alert("Login Successful");
        window.location.href = "/dashboard";
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 px-4">

      {/* CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Welcome Back 👋
          </h1>

          <p className="text-sm text-blue-100 leading-6">
            Login to continue reading blogs, writing posts, and interacting
            with the community of developers and creators.
          </p>

          <div className="mt-6 space-y-2 text-sm text-blue-100">
            <p>✔ Read latest blogs</p>
            <p>✔ Like & comment posts</p>
            <p>✔ Share your knowledge</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8 md:p-10">

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Username / Email
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username or email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Login
            </button>

            {/* Register link */}
            <p className="text-sm text-center text-gray-500 mt-3">
              Don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Register
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}