import React, { useState } from "react";

export default function Login() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      console.log(data);

      // LOGIN SUCCESS
      if (data.access) {

        // SAVE TOKENS
        localStorage.setItem(
          "access",
          data.access
        );

        localStorage.setItem(
          "refresh",
          data.refresh
        );

        alert("Login Successful");

        // CHECK TOKEN
        console.log(
          localStorage.getItem("access")
        );

        // REDIRECT
        window.location.href = "/";

      } else {

        alert("Invalid Credentials");

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-700 via-blue-700 to-slate-900 text-white p-12">

          <h1 className="text-4xl font-bold leading-tight mb-5">
            Welcome Back 👋
          </h1>

          <p className="text-sm text-slate-200 leading-7">
            Login to continue reading premium blogs,
            like posts, comment on articles and
            interact with creators around the world.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <span className="text-green-400">✔</span>
              <p className="text-sm">
                Read latest tech blogs
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400">✔</span>
              <p className="text-sm">
                Like and comment on posts
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400">✔</span>
              <p className="text-sm">
                Connect with developers
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12">

          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
            Login Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* USERNAME */}
            <div>

              <label className="block text-sm font-medium text-slate-600 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-slate-600 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* FORGOT */}
            <div className="text-right">

              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-300"
            >

              {loading ? "Please Wait..." : "Login"}

            </button>

            {/* REGISTER */}
            <p className="text-center text-sm text-slate-500">

              Don’t have an account?{" "}

              <span className="text-blue-600 hover:underline cursor-pointer">
                Register
              </span>

            </p>

          </form>

        </div>

      </div>
    </div>
  );
}