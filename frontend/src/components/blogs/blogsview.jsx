import { useEffect, useState } from "react";
import axios from "axios";

import {
  Heart,
  MessageCircle,
  Pencil,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Blogs() {

  const [blogs, setBlogs] = useState([]);

  const [commentText, setCommentText] = useState({});

  const [editText, setEditText] = useState({});

  const [editingId, setEditingId] = useState(null);

  // POPUP STATE
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  // SHOW POPUP
  const showPopup = (type, message) => {

    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {

      setPopup({
        show: false,
        type: "",
        message: "",
      });

    }, 2500);
  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/blogs/"
      );

      setBlogs(res.data);

    } catch (error) {

      showPopup(
        "error",
        "Failed to load blogs"
      );
    }
  };

  // LIKE
  const handleLike = async (id) => {

    try {

      const res = await axios.post(
        `http://127.0.0.1:8000/api/blogs/likes/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      fetchBlogs();

      showPopup(
        "success",
        res.data.message
      );

    } catch (error) {

      showPopup(
        "error",
        "Login required"
      );
    }
  };

  // ADD COMMENT
  const handleComment = async (id) => {

    if (!commentText[id]) {

      showPopup(
        "error",
        "Write something first"
      );

      return;
    }

    try {

      await axios.post(
        `http://127.0.0.1:8000/api/blogs/comments/${id}/`,
        {
          comnt: commentText[id],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setCommentText({
        ...commentText,
        [id]: "",
      });

      fetchBlogs();

      showPopup(
        "success",
        "Comment added"
      );

    } catch (error) {

      showPopup(
        "error",
        "Comment failed"
      );
    }
  };

  // DELETE COMMENT
  const deleteComment = async (commentId) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/blogs/comment/${commentId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      fetchBlogs();

      showPopup(
        "success",
        "Comment deleted"
      );

    } catch (error) {

      showPopup(
        "error",
        "Delete failed"
      );
    }
  };

  // UPDATE COMMENT
  const updateComment = async (commentId) => {

    try {

      await axios.patch(
        `http://127.0.0.1:8000/api/blogs/comment/${commentId}/`,
        {
          comnt: editText[commentId],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setEditingId(null);

      fetchBlogs();

      showPopup(
        "success",
        "Comment updated"
      );

    } catch (error) {

      showPopup(
        "error",
        "Update failed"
      );
    }
  };

  return (

    <section className="bg-[#f6f3ee] min-h-screen py-14 px-4 md:px-8">

      {/* POPUP */}

      <div
        className={`fixed top-5 right-5 z-50 transition-all duration-500 ${
          popup.show
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0"
        }`}
      >

        <div
          className={`min-w-[280px] md:min-w-[340px] rounded-2xl shadow-2xl border backdrop-blur-xl p-4 flex items-start gap-3 ${
            popup.type === "success"
              ? "bg-green-500/10 border-green-400"
              : "bg-red-500/10 border-red-400"
          }`}
        >

          <div>

            {popup.type === "success" ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <AlertCircle className="text-red-500" />
            )}

          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-black">
              {popup.type === "success"
                ? "Success"
                : "Error"}
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              {popup.message}
            </p>

          </div>

          <button
            onClick={() =>
              setPopup({
                show: false,
                type: "",
                message: "",
              })
            }
          >
            <X size={18} />
          </button>

        </div>

      </div>

      {/* BLOGS */}

      <div className="max-w-5xl mx-auto space-y-10">

        {blogs.map((blog) => (

          <div
            key={blog.id}
            className="bg-white rounded-[32px] overflow-hidden shadow-md border border-[#ece4d8]"
          >

            {/* IMAGE */}

            <div className="relative">

              <img
                src={blog.image}
                alt=""
                className="w-full h-[250px] md:h-[420px] object-cover"
              />

              {/* LIKE */}

              <button
                onClick={() => handleLike(blog.id)}
                className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-110 transition"
              >

                <Heart
                  size={22}
                  className="text-red-500 fill-red-500"
                />

              </button>

            </div>

            {/* CONTENT */}

            <div className="p-5 md:p-8">

              <span className="text-xs uppercase tracking-[0.2em] text-orange-500">
                {blog.Category}
              </span>

              <h2 className="text-2xl md:text-4xl font-bold mt-3 text-[#1b1712]">
                {blog.title}
              </h2>

              <p className="mt-5 text-[#655c52] leading-7 text-sm md:text-base">
                {blog.description}
              </p>

              {/* STATS */}

              <div className="flex items-center gap-7 border-b border-gray-200 pb-5 mt-7">

                <div className="flex items-center gap-2 text-gray-700">

                  <Heart size={18} />

                  <span>{blog.likes_count}</span>

                </div>

                <div className="flex items-center gap-2 text-gray-700">

                  <MessageCircle size={18} />

                  <span>{blog.comments?.length}</span>

                </div>

              </div>

              {/* COMMENTS */}

              <div className="mt-7 max-h-[320px] overflow-y-auto pr-2 space-y-4">

                {blog.comments?.map((comment) => (

                  <div
                    key={comment.id}
                    className="bg-[#faf8f5] rounded-2xl p-4 border"
                  >

                    <div className="flex justify-between items-center">

                      <h3 className="font-semibold text-sm">
                        {comment.user_username}
                      </h3>

                      <div className="flex gap-3">

                        <button
                          onClick={() => {

                            setEditingId(comment.id);

                            setEditText({
                              ...editText,
                              [comment.id]: comment.comnt,
                            });
                          }}
                        >

                          <Pencil
                            size={16}
                            className="text-blue-500"
                          />

                        </button>

                        <button
                          onClick={() =>
                            deleteComment(comment.id)
                          }
                        >

                          <Trash2
                            size={16}
                            className="text-red-500"
                          />

                        </button>

                      </div>

                    </div>

                    {editingId === comment.id ? (

                      <div className="flex gap-2 mt-3">

                        <input
                          value={editText[comment.id]}
                          onChange={(e) =>
                            setEditText({
                              ...editText,
                              [comment.id]:
                                e.target.value,
                            })
                          }
                          className="flex-1 border rounded-full px-4 py-2 text-sm"
                        />

                        <button
                          onClick={() =>
                            updateComment(comment.id)
                          }
                          className="bg-black text-white px-5 rounded-full text-sm"
                        >
                          Save
                        </button>

                      </div>

                    ) : (

                      <p className="text-sm text-gray-700 mt-3 leading-6">
                        {comment.comnt}
                      </p>

                    )}

                  </div>

                ))}

              </div>

              {/* ADD COMMENT */}

              <div className="flex flex-col sm:flex-row gap-3 mt-7">

                <input
                  type="text"
                  placeholder="Write your comment..."
                  value={commentText[blog.id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [blog.id]: e.target.value,
                    })
                  }
                  className="flex-1 border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-black"
                />

                <button
                  onClick={() =>
                    handleComment(blog.id)
                  }
                  className="bg-black hover:bg-[#2d2419] text-white px-8 py-3 rounded-full transition"
                >
                  Post
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}