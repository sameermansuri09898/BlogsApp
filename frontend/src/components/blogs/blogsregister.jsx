// src/components/blog/CreateBlogForm.jsx

import React, { useState } from "react";
import { createBlog } from "../../api/blogApi";

export default function CreateBlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));

      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    setSuccess("");

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("image", formData.image);

      await createBlog(data);

      setSuccess("Blog created successfully ✅");

      setFormData({
        title: "",
        description: "",
        image: null,
      });

      setPreview(null);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Blog
          </h1>

          <p className="text-gray-500 mt-2">
            Publish your new blog post
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write blog description..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Blog Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image}
              </p>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="border rounded-2xl overflow-hidden">
              <img
                src={preview}
                alt="preview"
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}